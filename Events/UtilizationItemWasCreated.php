<?php

declare(strict_types=1);

namespace Modules\Utilization\Events;

use Modules\Utilization\Models\UtilizationItem;

final class UtilizationItemWasCreated
{
    public function __construct(
        public readonly UtilizationItem $item
    ) {
    }
}
