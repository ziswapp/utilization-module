<?php

declare(strict_types=1);

namespace Modules\Utilization\Actions;

use Modules\Utilization\Models\Beneficiary;
use Modules\Utilization\DataTransfers\EditBeneficiaryData;

final class EditBeneficiary
{
    public function handle(Beneficiary $beneficiary, EditBeneficiaryData $data): Beneficiary
    {
        $attributes = $data->toArray();

        $beneficiary->update($attributes);

        return $beneficiary;
    }
}
