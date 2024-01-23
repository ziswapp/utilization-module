<?php

declare(strict_types=1);

namespace Modules\Utilization\DataTransfers;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\MapOutputName;

final class EditBeneficiaryData extends Data
{
    public function __construct(
        #[MapInputName('beneficiary_type_id')]
        #[MapOutputName('beneficiary_type_id')]
        public int $type,
        public string $name,
        public ?string $nik,
        public ?string $email,
        public ?string $phone,
        #[MapInputName('phone_country')]
        #[MapOutputName('phone_country')]
        public ?string $phoneCountry,
        public ?string $address,
        #[MapInputName('province_code')]
        #[MapOutputName('province_code')]
        public ?string $province,
        #[MapInputName('city_code')]
        #[MapOutputName('city_code')]
        public ?string $city,
        #[MapInputName('district_code')]
        #[MapOutputName('district_code')]
        public ?string $district,
        #[MapInputName('village_code')]
        #[MapOutputName('village_code')]
        public ?string $village,
        #[MapInputName('postal_code')]
        #[MapOutputName('postal_code')]
        public ?string $postal,
        #[MapInputName('sex')]
        #[MapOutputName('sex')]
        public ?string $sex,
        #[MapInputName('age_range')]
        #[MapOutputName('age_range')]
        public ?string $ageRange,
    ) {
    }
}
