<?php

declare(strict_types=1);

namespace Modules\Utilization\Actions;

use Modules\Utilization\Models\Utilization;
use Modules\Utilization\Enums\UtilizationStatus;

final class CancelUtilization
{
    public function handle(Utilization $utilization): void
    {
        if ($utilization->isCancel() === false) {
            $utilization->update([
                'status' => UtilizationStatus::cancel,
            ]);
        }
    }
}
