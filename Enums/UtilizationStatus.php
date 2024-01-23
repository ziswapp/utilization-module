<?php

declare(strict_types=1);

namespace Modules\Utilization\Enums;

enum UtilizationStatus: string
{
    case draft = 'draft';

    case new = 'new';

    case cancel = 'cancel';
}
