<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\PageProps;

use Illuminate\Http\Request;
use Modules\Utilization\Models\Utilization;
use Illuminate\Database\Eloquent\Relations\Relation;
use Modules\Utilization\Repositories\BeneficiaryRepository;

final class ShowUtilizationProps
{
    public function __construct(
        private readonly BeneficiaryRepository $beneficiaryRepository
    ) {
    }

    public function loadData(Utilization $utilization, Request $request): array
    {
        $utilization->loadMissing([
            'user' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'branch' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'type' => fn (Relation $relation): Relation => $relation->select(['id', 'name', 'is_distribution']),
            'program' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
        ]);

        $items = $utilization->items()->with([
            'source' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'beneficiary' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
        ])->get();

        $attachments = $utilization->attachments()->get();

        $beneficiaries = $this->beneficiaryRepository->filterUsingUtilization($utilization, $request);

        return \compact('utilization', 'items', 'attachments', 'beneficiaries');
    }
}
