<?php

declare(strict_types=1);

namespace Modules\Utilization\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Modules\Utilization\Models\FundingSource;

final class FundingSourceRepository
{
    public function fetchForSelectOption(): Collection
    {
        /** @psalm-var Collection<FundingSource> */
        return FundingSource::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get();
    }
}
