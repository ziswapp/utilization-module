<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\PageProps;

use Illuminate\Http\Request;
use Modules\Utilization\Models\Beneficiary;
use Illuminate\Database\Eloquent\Relations\Relation;
use Modules\Utilization\Repositories\UtilizationRepository;

final class ShowBeneficiaryProps
{
    public function __construct(
        private readonly UtilizationRepository $utilizationRepository
    ) {
    }

    public function loadData(Beneficiary $beneficiary, Request $request): array
    {
        $beneficiary->loadMissing([
            'type' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'province' => fn (Relation $relation): Relation => $relation->select(['id', 'code', 'name']),
            'city' => fn (Relation $relation): Relation => $relation->select(['id', 'code', 'name']),
            'district' => fn (Relation $relation): Relation => $relation->select(['id', 'code', 'name']),
            'village' => fn (Relation $relation): Relation => $relation->select(['id', 'code', 'name']),
        ]);

        $utilizations = $this->utilizationRepository->filterUsingBeneficiary($beneficiary, $request);

        return \compact('beneficiary', 'utilizations');
    }
}
