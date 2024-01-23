<?php

declare(strict_types=1);

namespace Modules\Utilization\Models;

use Illuminate\Database\Eloquent\Model;
use Ziswapp\Domain\Foundation\Model\FundingCategory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class FundingSource extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(FundingCategory::class, 'funding_category_id');
    }
}
