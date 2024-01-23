<?php

declare(strict_types=1);

namespace Modules\Utilization\Policy;

use Ziswapp\Domain\Foundation\Model\User;
use Illuminate\Auth\Access\HandlesAuthorization;

final class FundingSourcePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('menu.funding.source');
    }
}
