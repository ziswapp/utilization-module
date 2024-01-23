<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Modules\Utilization\Models\FundingSource;
use Modules\Utilization\Models\BeneficiaryType;

final class StoreItemRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'description' => 'required|max:255',
            'funding_source_id' => [
                'required',
                Rule::exists(FundingSource::class, 'id'),
            ],
            'beneficiary_type_id' => [
                'required',
                Rule::exists(BeneficiaryType::class, 'id'),
            ],
            'amount' => 'required',
        ];
    }
}
