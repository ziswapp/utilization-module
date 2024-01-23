<?php

declare(strict_types=1);

namespace Modules\Utilization\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Modules\Utilization\Models\BeneficiaryType;

final class BeneficiaryTypeRepository
{
    public function fetchForSelectOption(): Collection
    {
        /** @psalm-var Collection<BeneficiaryType> */
        return BeneficiaryType::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get();
    }
}
