<?php

declare(strict_types=1);

namespace Modules\Utilization\Http\Requests;

use Illuminate\Validation\Rule;
use Ziswapp\Domain\Foundation\Model\User;
use Modules\Utilization\Enums\PaymentType;
use Illuminate\Foundation\Http\FormRequest;
use Ziswapp\Domain\Transaction\Model\Program;
use Illuminate\Contracts\Validation\Validator;
use Modules\Utilization\Models\UtilizationType;

final class StoreUtilizationRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'utilization_type_id' => [
                'required',
                Rule::exists(UtilizationType::class, 'id')
                    ->where('is_active', true),
            ],
            'user_id' => [
                'required',
                Rule::exists(User::class, 'id'),
            ],
            'branch_id' => [
                'required',
                Rule::exists(User::class, 'branch_id')
                    ->where('id', $this->input('user_id')),
            ],
            'description' => 'required|max:255',
            'use_at' => 'required|date|before_or_equal:'.\now(
                $this->user()?->getAttribute('timezone')
            )->endOfDay(),
            'payment_type' => 'required|in:cash,transfer',
            'distribution_at' => 'nullable|date|before_or_equal:'.\now(
                $this->user()?->getAttribute('timezone')
            )->endOfDay(),
            'distribution_program_id' => [
                'nullable', Rule::exists(Program::class, 'id'),
            ],
            'distribution_program_description' => 'nullable',
        ];
    }

    protected function getValidatorInstance(): Validator
    {
        $v = parent::getValidatorInstance();

        $v->sometimes(
            ['bank_name', 'bank_account_number', 'bank_account_name'],
            'required',
            fn () => $this->input('payment_type') === PaymentType::transfer->value
        );

        return $v;
    }
}
