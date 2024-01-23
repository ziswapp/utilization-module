<?php

declare(strict_types=1);

namespace Modules\Utilization\Actions;

use Modules\Utilization\Models\Utilization;

final class DetachBeneficiary
{
    public function handle(Utilization $utilization, array $ids): void
    {
        $utilization->beneficiaries()->detach($ids);
    }
}
