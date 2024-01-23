<?php

declare(strict_types=1);

namespace Modules\Utilization\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Modules\Utilization\Models\UtilizationType;

final class UtilizationTypeRepository
{
    public function fetchForSelectOption(): Collection
    {
        /** @psalm-var Collection<UtilizationType> */
        return UtilizationType::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get();
    }
}
