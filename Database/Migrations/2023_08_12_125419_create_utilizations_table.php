<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('utilizations', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignId('utilization_type_id')->constrained();
            $table->unsignedBigInteger('identification_number')->unique();

            $table->foreignId('branch_id')->constrained();
            $table->foreignId('user_id')->constrained();

            $table->string('status', 25);

            $table->string('description');

            $table->dateTime('use_at');

            $table->string('payment_type', 8);
            $table->string('bank_name', 50)->nullable();
            $table->string('bank_account_number', 25)->nullable();
            $table->string('bank_account_name', 100)->nullable();

            $table->decimal('amount', 18)->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utilizations');
    }
};
