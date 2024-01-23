<?php

declare(strict_types=1);

namespace Modules\Utilization\Enums;

enum PaymentType: string
{
    case transfer = 'transfer';

    case cash = 'cash';
}
