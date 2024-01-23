<?php

declare(strict_types=1);

namespace Modules\Utilization\Actions;

use Modules\Utilization\Models\Utilization;
use Modules\Utilization\Enums\UtilizationStatus;
use Modules\Utilization\Events\UtilizationWasCreated;
use Modules\Utilization\DataTransfers\NewUtilizationData;

final class StoreNewUtilization
{
    public function handle(NewUtilizationData $data): Utilization
    {
        /** @var Utilization $model */
        $model = Utilization::query()->create([
            ...$data->toArray(), 'status' => UtilizationStatus::draft,
        ]);

        event(new UtilizationWasCreated($model));

        return $model;
    }
}
