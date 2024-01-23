<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\PageProps;

use Ziswapp\Domain\Foundation\Repository\UserRepository;
use Ziswapp\Domain\Foundation\Repository\ProgramRepository;
use Modules\Utilization\Repositories\UtilizationTypeRepository;

final class NewUtilizationProps
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly UtilizationTypeRepository $typeRepository,
        private readonly ProgramRepository $programRepository,
    ) {
    }

    public function loadData(): array
    {
        $users = $this->userRepository->fetchActiveForSelectOption();
        $types = $this->typeRepository->fetchForSelectOption();
        $programs = $this->programRepository->fetchActiveForSelectOption();

        return \compact('users', 'types', 'programs');
    }
}
