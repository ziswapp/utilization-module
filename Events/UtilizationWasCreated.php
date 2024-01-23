<?php

declare(strict_types=1);

namespace Modules\Utilization\Events;

use Modules\Utilization\Models\Utilization;

final class UtilizationWasCreated
{
    public function __construct(
        public readonly Utilization $utilization
    ) {
    }
}
