<?php

declare(strict_types=1);

namespace Modules\Utilization\Actions;

use Modules\Utilization\Models\Utilization;
use Modules\Utilization\Events\UtilizationWasUpdated;
use Modules\Utilization\DataTransfers\EditUtilizationData;

final class EditUtilization
{
    public function handle(Utilization $utilization, EditUtilizationData $data): void
    {
        $utilization->update(
            $data->toArray()
        );

        event(new UtilizationWasUpdated($utilization));
    }
}
