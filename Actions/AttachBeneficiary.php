<?php

declare(strict_types=1);

namespace Modules\Utilization\Actions;

use Modules\Utilization\Models\Utilization;

final class AttachBeneficiary
{
    public function handle(Utilization $utilization, array $ids): void
    {
        $utilization->beneficiaries()->attach($ids);
    }
}
