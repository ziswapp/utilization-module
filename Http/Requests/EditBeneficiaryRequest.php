<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Modules\Utilization\Models\Beneficiary;
use Modules\Utilization\Models\BeneficiaryType;

final class EditBeneficiaryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'beneficiary_type_id' => [
                'required',
                Rule::exists(BeneficiaryType::class, 'id'),
            ],
            'name' => 'required',
            'nik' => [
                'nullable',
                Rule::unique(Beneficiary::class, 'nik')->ignore(
                    $this->route('beneficiary')
                ),
            ],
            'phone' => [
                'nullable',
                'phone:INTERNATIONAL,ID',
                Rule::unique(Beneficiary::class, 'phone')->ignore(
                    $this->route('beneficiary')
                ),
            ],
            'phone_country' => 'required|max:2|required_with:phone',
            'email' => 'nullable|email',
            'address' => 'nullable',
            'province_code' => 'nullable|exists:provinces,code',
            'city_code' => 'nullable|exists:cities,code',
            'district_code' => 'nullable|exists:districts,code',
            'village_code' => 'nullable|exists:villages,code',
            'postal_code' => 'nullable',
            'sex' => [
                'nullable',
                Rule::in(['Laki - laki', 'Perempuan']),
            ],
            'age_range' => [
                'nullable',
                Rule::in(['Anak - anak', 'Remaja', 'Dewasa', 'Lansia']),
            ],
        ];
    }
}
