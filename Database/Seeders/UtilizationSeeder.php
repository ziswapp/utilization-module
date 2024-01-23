<?php

declare(strict_types=1);

namespace Modules\Utilization\Database\Seeders;

use Illuminate\Database\Seeder;

final class UtilizationSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(BeneficiaryTypeTableSeeder::class);
    }
}
