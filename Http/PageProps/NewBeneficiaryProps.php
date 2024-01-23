<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\PageProps;

use Illuminate\Http\Request;
use Modules\Utilization\Models\Utilization;
use Illuminate\Database\Eloquent\Relations\Relation;
use Ziswapp\Domain\Address\Repository\AddressRepository;
use Modules\Utilization\Repositories\BeneficiaryRepository;
use Modules\Utilization\Repositories\BeneficiaryTypeRepository;

final class NewBeneficiaryProps
{
    public function __construct(
        private readonly AddressRepository $addressRepository,
        private readonly BeneficiaryRepository $beneficiaryRepository,
        private readonly BeneficiaryTypeRepository $typeRepository,
    ) {
    }

    public function loadData(Utilization $utilization, Request $request): array
    {
        $utilization->loadMissing([
            'user' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'branch' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'type' => fn (Relation $relation): Relation => $relation->select(['id', 'name', 'is_distribution']),
        ]);

        $types = $this->typeRepository->fetchForSelectOption();
        $candidates = $this->beneficiaryRepository->filterCandidate($request, $utilization);
        $beneficiaries = $this->beneficiaryRepository->filterUsingUtilization($utilization, $request);

        [$provinces, $cities, $districts, $villages] = $this->addressRepository->fetchForSelectOption($request);

        return \compact(
            'utilization',
            'candidates',
            'beneficiaries',
            'types',
            'provinces',
            'cities',
            'districts',
            'villages'
        );
    }
}
