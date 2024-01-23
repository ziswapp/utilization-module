<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('beneficiaries') === false) {
            Schema::create('beneficiaries', function (Blueprint $table): void {
                $table->uuid('id')->primary();

                $table->foreignId('user_id');
                $table->foreignId('branch_id');
                $table->foreignId('beneficiary_type_id');
                $table->unsignedBigInteger('identification_number')->unique();

                $table->string('nik')->nullable()->index();
                $table->string('name');

                $table->string('email')->nullable()->index();

                $table->string('phone', 50)->nullable()->index();
                $table->string('phone_country', 5)->nullable();

                $table->string('address')->nullable();
                $table->string('province_code', 2)->nullable();
                $table->string('city_code', 4)->nullable();
                $table->string('district_code', 7)->nullable();
                $table->string('village_code', 10)->nullable();
                $table->string('postal_code', 10)->nullable();

                $table->timestamps();
            });

            Schema::create('beneficiary_utilization', function (Blueprint $table): void {
                $table->foreignUuid('beneficiary_id');
                $table->foreignUuid('utilization_id');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('beneficiaries');
        Schema::dropIfExists('beneficiary_utilization');
    }
};
