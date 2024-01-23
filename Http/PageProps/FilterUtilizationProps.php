<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\PageProps;

use Illuminate\Http\Request;
use Ziswapp\Domain\Foundation\Repository\UserRepository;
use Ziswapp\Domain\Foundation\Repository\BranchRepository;
use Modules\Utilization\Repositories\UtilizationRepository;
use Modules\Utilization\Repositories\UtilizationTypeRepository;

final class FilterUtilizationProps
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly BranchRepository $branchRepository,
        private readonly UtilizationTypeRepository $typeRepository,
        private readonly UtilizationRepository $utilizationRepository,
    ) {
    }

    public function loadData(Request $request): array
    {
        $users = $this->userRepository->fetchForSelectOption();
        $branches = $this->branchRepository->fetchForSelectOption();
        $types = $this->typeRepository->fetchForSelectOption();

        $utilizations = $this->utilizationRepository->filter($request);

        return \compact('users', 'types', 'utilizations', 'branches');
    }
}
