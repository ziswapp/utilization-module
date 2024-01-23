<?php

declare(strict_types=1);

namespace Modules\Utilization\Models;

use Illuminate\Database\Eloquent\Model;

final class BeneficiaryType extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
