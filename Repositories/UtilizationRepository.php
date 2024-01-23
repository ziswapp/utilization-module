<?php

declare(strict_types=1);

namespace Modules\Utilization\Repositories;

use DateTimeInterface;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\Builder;
use Modules\Utilization\Models\Beneficiary;
use Modules\Utilization\Models\Utilization;
use Ziswapp\Domain\Foundation\Model\Branch;
use Illuminate\Database\Eloquent\Collection;
use Ziswapp\QueryBuilder\Filter\AmountFilter;
use Ziswapp\QueryBuilder\Filter\DateTimeFilter;
use Modules\Utilization\Enums\UtilizationStatus;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Modules\Utilization\Eloquent\UtilizationQueryBuilder;

final class UtilizationRepository
{
    public function fetchUtilizationUsedAmount(Branch $branch, DateTimeInterface $start, DateTimeInterface $end): int|string
    {
        $branchIds = $branch->getSelfAndDescendants();

        return Utilization::query()
            ->whereBranches($branchIds)
            ->whereStatus(UtilizationStatus::new)
            ->whereBetween('use_at', [$start, $end])
            ->sum('amount');
    }

    public function fetchAmountGroupByType(Branch $branch, DateTimeInterface $start, DateTimeInterface $end): Collection
    {
        $branchIds = $branch->getSelfAndDescendants();

        return Utilization::query()
            ->joinWithType()
            ->selectRaw('utilization_types.name as type, sum(utilizations.amount) as aggregate')
            ->whereBranches($branchIds)
            ->whereStatus(UtilizationStatus::new)
            ->whereBetween('use_at', [$start, $end])
            ->groupBy('utilization_types.name')
            ->orderBy('utilization_types.name')
            ->get();
    }

    public function filterUsingBeneficiary(Beneficiary $beneficiary, Request $request): LengthAwarePaginator
    {
        /** @var string|null $keyword */
        $keyword = $request->query('q');

        return $beneficiary->utilizations()->with([
            'type' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
        ])->where(function (UtilizationQueryBuilder $builder) use ($keyword): void {
            $builder->whereSearch($keyword);
        })->latest()->paginate();
    }

    public function filter(Request $request): LengthAwarePaginator
    {
        /** @var string|null $keyword */
        $keyword = $request->query('q');

        $builder = Utilization::query()->with([
            'type' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
        ])->withSearch($keyword)->latest();

        return $this->makeQueryBuilder($builder, $request)->paginate();
    }

    private function makeQueryBuilder(Builder|Relation|string $subject, ?Request $request = null): QueryBuilder
    {
        return QueryBuilder::for($subject, $request)->allowedFilters([
            AllowedFilter::exact('type', 'utilization_type_id'),
            AllowedFilter::exact('status', 'status'),
            AllowedFilter::exact('user', 'user_id'),
            AllowedFilter::exact('branch', 'branch_id'),
            AllowedFilter::custom('use_at', new DateTimeFilter(), 'use_at'),
            AllowedFilter::custom('created_at', new DateTimeFilter(), 'created_at'),
            AllowedFilter::custom('amount', new AmountFilter()),
        ]);
    }
}
