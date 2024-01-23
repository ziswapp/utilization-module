<?php

declare(strict_types=1);

namespace Modules\Utilization\Repositories;

use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\Builder;
use Modules\Utilization\Models\Beneficiary;
use Modules\Utilization\Models\Utilization;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class BeneficiaryRepository
{
    public function filterUsingUtilization(Utilization $utilization, Request $request): LengthAwarePaginator
    {
        /** @var string|null $keyword */
        $keyword = $request->query('beneficiaryKeyword', $request->query('q'));

        $builder = Beneficiary::query()
            ->whereHas('utilizations', function (Builder $builder) use ($utilization): Builder {
                return $builder->where('utilization_id', $utilization->getKey());
            })->with([
                'type' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            ])->withSearch($keyword)->latest();

        return $this->makeQueryBuilder($builder, $request)->paginate(pageName: 'beneficiaryPage');
    }

    public function filterCandidate(Request $request, Utilization $doesntHave): LengthAwarePaginator
    {
        /** @var string|null $keyword */
        $keyword = $request->query('candidateKeyword', $request->query('q'));

        $builder = Beneficiary::query()->with([
            'type' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
        ])->whereDoesntHave('utilizations', function (Builder $builder) use ($doesntHave): Builder {
            return $builder->where('utilization_id', $doesntHave?->getKey());
        })->withSearch($keyword)->latest();

        return $this->makeQueryBuilder($builder, $request)->paginate(pageName: 'candidatePage');
    }

    public function filter(Request $request): LengthAwarePaginator
    {
        /** @var string|null $keyword */
        $keyword = $request->query('candidateKeyword', $request->query('q'));

        $builder = Beneficiary::query()->with([
            'type' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
        ])->withSearch($keyword)->latest();

        return $this->makeQueryBuilder($builder, $request)->paginate();
    }

    private function makeQueryBuilder(Builder|Relation|string $subject, ?Request $request = null): QueryBuilder
    {
        return QueryBuilder::for($subject, $request)->allowedFilters([
            AllowedFilter::exact('type', 'beneficiary_type_id'),
            AllowedFilter::exact('user', 'user_id'),
            AllowedFilter::exact('branch', 'branch_id'),
        ]);
    }
}
