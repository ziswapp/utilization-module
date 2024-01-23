<?php

declare(strict_types=1);

namespace Modules\Utilization\Events;

use Modules\Utilization\Models\Utilization;

final class UtilizationWasUpdated
{
    public function __construct(
        public readonly Utilization $utilization
    ) {
    }
}
