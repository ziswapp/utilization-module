<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\PageProps;

use Illuminate\Http\Request;
use Ziswapp\Domain\Foundation\Model\User;
use Ziswapp\Domain\Foundation\Repository\BranchRepository;
use Modules\Utilization\Repositories\UtilizationRepository;
use Modules\Utilization\Repositories\UtilizationItemRepository;

final class DashboardProps
{
    public function __construct(
        private readonly BranchRepository $branchRepository,
        private readonly UtilizationRepository $utilizationRepository,
        private readonly UtilizationItemRepository $itemRepository
    ) {
    }

    public function loadData(Request $request): array
    {
        /** @var User $user */
        $user = $request->user();

        [$start, $end] = $this->getStartEndDate($request, $user);

        $branch = $this->branchRepository->findUsingId(
            $request->integer('branch')
        ) ?: $user->getBranch();

        $branches = $this->branchRepository->fetchForSelectOption();

        $usedAmount = $this->utilizationRepository->fetchUtilizationUsedAmount($branch, $start, $end);
        $amountByType = $this->utilizationRepository->fetchAmountGroupByType($branch, $start, $end);
        $amountBySource = $this->itemRepository->fetchAmountGroupByFundingSource($branch, $start, $end);
        $amountByBeneficiary = $this->itemRepository->fetchAmountGroupByBeneficiary($branch, $start, $end);

        return \compact('branches', 'usedAmount', 'amountBySource', 'amountByType', 'amountByBeneficiary');
    }

    private function getStartEndDate(Request $request, User $user): array
    {
        $start = $request->date('start') ?: now()->startOfMonth();
        $end = $request->date('end') ?: now()->endOfMonth();

        return [$start->timezone($user->getAttribute('timezone'))->startOfDay(), $end->timezone($user->getAttribute('timezone'))->endOfDay()];
    }
}
