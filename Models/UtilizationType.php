<?php

declare(strict_types=1);

namespace Modules\Utilization\Models;

use Illuminate\Database\Eloquent\Model;

final class UtilizationType extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_distribution' => 'boolean',
        'is_active' => 'boolean',
    ];
}
