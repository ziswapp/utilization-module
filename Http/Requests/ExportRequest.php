<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Ziswapp\Domain\Foundation\Model\Branch;
use Modules\Utilization\Models\UtilizationType;

final class ExportRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'branch' => [
                'required',
                Rule::exists(Branch::class, 'id'),
            ],
            'type' => [
                'nullable',
                Rule::exists(UtilizationType::class, 'id')->where('is_active', true),
            ],
            'status' => [
                'nullable',
                'in:new,cancel',
            ],
            'start' => [
                'required', 'date',
            ],
            'end' => [
                'required', 'date',
            ],
        ];
    }
}
