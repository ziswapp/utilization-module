<?php

declare(strict_types=1);

namespace Modules\Utilization\Actions;

use Modules\Utilization\Models\Utilization;
use Modules\Utilization\Models\UtilizationItem;
use Modules\Utilization\DataTransfers\NewItemData;
use Modules\Utilization\Events\UtilizationItemWasCreated;

final class StoreNewItem
{
    public function handle(Utilization $utilization, NewItemData $data): UtilizationItem
    {
        /** @var UtilizationItem $model */
        $model = $utilization->items()->create(
            $data->toArray()
        );

        $model->utilization()->increment('amount', $data->amount);

        event(new UtilizationItemWasCreated($model));

        return $model;
    }
}
