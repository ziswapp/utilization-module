<?php

declare(strict_types=1);

namespace Modules\Utilization\Repositories;

use DateTimeInterface;
use Ziswapp\Domain\Foundation\Model\Branch;
use Illuminate\Database\Eloquent\Collection;
use Modules\Utilization\Models\UtilizationItem;
use Modules\Utilization\Enums\UtilizationStatus;

final class UtilizationItemRepository
{
    public function fetchAmountGroupByFundingSource(Branch $branch, DateTimeInterface $start, DateTimeInterface $end): Collection
    {
        $branchIds = $branch->getSelfAndDescendantsId();

        return UtilizationItem::query()
            ->joinWithUtilization()
            ->joinWithFundingSource()
            ->selectRaw('funding_sources.name as source, sum(utilization_items.amount) as aggregate')
            ->whereIn('utilizations.branch_id', $branchIds)
            ->whereBetween('utilizations.use_at', [$start, $end])
            ->where('utilizations.status', UtilizationStatus::new)
            ->groupBy('funding_sources.name')
            ->orderBy('funding_sources.name')
            ->get();
    }

    public function fetchAmountGroupByBeneficiary(Branch $branch, DateTimeInterface $start, DateTimeInterface $end): Collection
    {
        $branchIds = $branch->getSelfAndDescendantsId();

        return UtilizationItem::query()
            ->joinWithUtilization()
            ->joinWithBeneficiaryType()
            ->selectRaw('beneficiary_types.name as beneficiary, sum(utilization_items.amount) as aggregate')
            ->whereIn('utilizations.branch_id', $branchIds)
            ->whereBetween('utilizations.use_at', [$start, $end])
            ->where('utilizations.status', UtilizationStatus::new)
            ->groupBy('beneficiary_types.name')
            ->orderBy('beneficiary_types.name')
            ->get();
    }
}
