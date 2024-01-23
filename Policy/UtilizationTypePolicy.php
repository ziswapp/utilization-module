<?php

declare(strict_types=1);

namespace Modules\Utilization\Policy;

use Ziswapp\Domain\Foundation\Model\User;
use Illuminate\Auth\Access\HandlesAuthorization;

final class UtilizationTypePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('menu.utilization.type');
    }
}
