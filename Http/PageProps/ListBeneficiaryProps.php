<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\PageProps;

use Illuminate\Http\Request;
use Ziswapp\Domain\Foundation\Repository\UserRepository;
use Ziswapp\Domain\Foundation\Repository\BranchRepository;
use Modules\Utilization\Repositories\BeneficiaryRepository;
use Modules\Utilization\Repositories\BeneficiaryTypeRepository;

final class ListBeneficiaryProps
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly BranchRepository $branchRepository,
        private readonly BeneficiaryTypeRepository $typeRepository,
        private readonly BeneficiaryRepository $beneficiaryRepository,
    ) {
    }

    public function loadData(Request $request): array
    {
        $users = $this->userRepository->fetchForSelectOption();
        $branches = $this->branchRepository->fetchForSelectOption();
        $types = $this->typeRepository->fetchForSelectOption();
        $beneficiaries = $this->beneficiaryRepository->filter($request);

        return \compact('beneficiaries', 'types', 'users', 'branches');
    }
}
