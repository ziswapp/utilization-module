<?php

declare(strict_types=1);

namespace Modules\Utilization\Actions;

use Modules\Utilization\Models\UtilizationItem;

final class DeleteItem
{
    public function handle(UtilizationItem $item): void
    {
        $item->utilization()->decrement('amount', $item->getAttribute('amount'));

        $item->delete();
    }
}
