<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\PageProps;

use Modules\Utilization\Models\Utilization;
use Illuminate\Database\Eloquent\Relations\Relation;
use Modules\Utilization\Repositories\FundingSourceRepository;
use Modules\Utilization\Repositories\BeneficiaryTypeRepository;

final class NewItemProps
{
    public function __construct(
        private readonly FundingSourceRepository $sourceRepository,
        private readonly BeneficiaryTypeRepository $typeRepository,
    ) {
    }

    public function loadData(Utilization $utilization): array
    {
        $utilization->loadMissing([
            'user' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'branch' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'type' => fn (Relation $relation): Relation => $relation->select(['id', 'name', 'is_distribution']),
        ]);

        $sources = $this->sourceRepository->fetchForSelectOption();
        $beneficiaries = $this->typeRepository->fetchForSelectOption();

        $items = $utilization->items()->with([
            'source' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'beneficiary' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
        ])->get();

        return \compact('sources', 'beneficiaries', 'utilization', 'items');
    }
}
