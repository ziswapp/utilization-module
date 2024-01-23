<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\PageProps;

use Modules\Utilization\Models\Utilization;
use Illuminate\Database\Eloquent\Relations\Relation;
use Ziswapp\Domain\Foundation\Repository\UserRepository;
use Ziswapp\Domain\Foundation\Repository\ProgramRepository;
use Modules\Utilization\Repositories\UtilizationTypeRepository;

final class EditUtilizationProps
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly UtilizationTypeRepository $typeRepository,
        private readonly ProgramRepository $programRepository,
    ) {
    }

    public function loadData(Utilization $utilization): array
    {
        $utilization->loadMissing([
            'user' => fn (Relation $relation): Relation => $relation->select(['id', 'name', 'branch_id']),
            'branch' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
            'type' => fn (Relation $relation): Relation => $relation->select(['id', 'name', 'is_distribution']),
            'program' => fn (Relation $relation): Relation => $relation->select(['id', 'name']),
        ]);

        $users = $this->userRepository->fetchActiveForSelectOption();
        $types = $this->typeRepository->fetchForSelectOption();
        $programs = $this->programRepository->fetchActiveForSelectOption();

        return \compact('utilization', 'users', 'types', 'programs');
    }
}
