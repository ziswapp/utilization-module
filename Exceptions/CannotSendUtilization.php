<?php

declare(strict_types=1);

namespace Modules\Utilization\Exceptions;

use Exception;

final class CannotSendUtilization extends Exception
{
    public static function withMessage(string $message): self
    {
        return new self($message);
    }
}
