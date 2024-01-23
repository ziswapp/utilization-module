<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\PageProps;

use Modules\Utilization\Models\Beneficiary;
use Illuminate\Database\Eloquent\Relations\Relation;

final class EditBeneficiaryProps
{
    public function loadData(Beneficiary $beneficiary): array
    {
        $beneficiary->loadMissing([
            'type' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'province' => fn (Relation $relation): Relation => $relation->select(['id', 'code', 'name']),
            'city' => fn (Relation $relation): Relation => $relation->select(['id', 'code', 'name']),
            'district' => fn (Relation $relation): Relation => $relation->select(['id', 'code', 'name']),
            'village' => fn (Relation $relation): Relation => $relation->select(['id', 'code', 'name']),
        ]);

        return \compact('beneficiary');
    }
}
