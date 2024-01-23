<?php

declare(strict_types=1);

namespace Modules\Utilization\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Utilization\Models\BeneficiaryType;

final class BeneficiaryTypeTableSeeder extends Seeder
{
    private array $categories = [
        'Fakir Miskin',
        'Amil',
        'Muallaf',
        'Hamba Sahaya',
        'Gharimin',
        'Fiisabilillah',
        'Ibnus Sabil',
    ];

    public function run(): void
    {
        BeneficiaryType::query()->truncate();

        foreach ($this->categories as $name) {
            BeneficiaryType::query()->forceCreate(
                \compact('name')
            );
        }
    }
}
