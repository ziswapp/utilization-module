<?php

declare(strict_types=1);

namespace Modules\Utilization\Actions;

use Modules\Utilization\Models\Beneficiary;
use Modules\Utilization\Models\Utilization;
use Modules\Utilization\DataTransfers\NewBeneficiaryData;

final class CreateNewBeneficiary
{
    public function handle(NewBeneficiaryData $data, ?Utilization $utilization = null): Beneficiary
    {
        $attributes = $data->toArray();

        if ($utilization) {
            /** @var Beneficiary */
            return $utilization->beneficiaries()->create($attributes);
        }

        /** @var Beneficiary */
        return Beneficiary::query()->create(
            $attributes
        );
    }
}
