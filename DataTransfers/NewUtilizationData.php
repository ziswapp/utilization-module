<?php

declare(strict_types=1);

namespace Modules\Utilization\DataTransfers;

use DateTime;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;

final class NewUtilizationData extends Data
{
    public function __construct(
        #[MapInputName('utilization_type_id')]
        #[MapOutputName('utilization_type_id')]
        public readonly int $typeId,

        #[MapInputName('identification_number')]
        #[MapOutputName('identification_number')]
        public readonly string $identificationNumber,

        #[MapInputName('branch_id')]
        #[MapOutputName('branch_id')]
        public readonly int $branchId,

        #[MapInputName('user_id')]
        #[MapOutputName('user_id')]
        public readonly int $userId,

        public readonly string $description,

        #[MapInputName('use_at')]
        #[MapOutputName('use_at')]
        #[WithCast(DateTimeInterfaceCast::class, 'Y-m-d')]
        public readonly DateTime $useAt,

        #[MapInputName('payment_type')]
        #[MapOutputName('payment_type')]
        public readonly string $paymentType,

        #[MapInputName('bank_name')]
        #[MapOutputName('bank_name')]
        public readonly ?string $bankName = null,

        #[MapInputName('bank_account_number')]
        #[MapOutputName('bank_account_number')]
        public readonly ?string $bankAccountNumber = null,

        #[MapInputName('bank_account_name')]
        #[MapOutputName('bank_account_name')]
        public readonly ?string $bankAccountName = null,

        #[MapInputName('distribution_at')]
        #[MapOutputName('distribution_at')]
        #[WithCast(DateTimeInterfaceCast::class, 'Y-m-d')]
        public readonly ?DateTime $distributionAt = null,

        #[MapInputName('distribution_program_id')]
        #[MapOutputName('distribution_program_id')]
        public readonly ?int $program = null,

        #[MapInputName('distribution_program_description')]
        #[MapOutputName('distribution_program_description')]
        public readonly ?string $programDescription = null,
    ) {
    }
}
