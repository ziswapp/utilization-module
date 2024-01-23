<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class() extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('beneficiary_types') === false) {
            Schema::create('beneficiary_types', static function (Blueprint $table): void {
                $table->id();
                $table->string('name');
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('beneficiary_types');
    }
};
