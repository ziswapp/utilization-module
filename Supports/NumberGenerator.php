<?php

declare(strict_types=1);

namespace Modules\Utilization\Supports;

use Ziswapp\Database\Eloquent\Model;
use Modules\Utilization\Models\Utilization;

final class NumberGenerator
{
    private static array $exists = [];

    /**
     * @param  class-string<Model>  $modelClass
     */
    public static function generate(string $modelClass = Utilization::class): string
    {
        do {
            $number = now()->format('ym').now()->timestamp;

            $exists = \array_key_exists($number, self::$exists) || $modelClass::query()->where('identification_number', $number)->exists();

            if ($exists) {
                self::$exists[$number] = $number;
            }
        } while ($exists === true);

        return $number;
    }
}
