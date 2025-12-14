<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('initiatives', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('title');
            $table->integer('year');
            $table->unsignedBigInteger('pillar_id');
            $table->integer('row_number');
            $table->text('description')->nullable();
            $table->date('duration_start')->nullable();
            $table->date('duration_end')->nullable();
            $table->string('stream_lead')->nullable();
            $table->string('pic')->nullable();
            $table->enum('budget_type', ['OPEX', 'CAPEX', 'MIXED'])->default('OPEX');
            $table->decimal('budget_amount', 15, 2)->nullable();
            $table->string('budget_currency', 10)->default('IDR');
            $table->enum('status', ['planning', 'in_progress', 'completed', 'on_hold', 'cancelled'])->default('planning');
            $table->timestamps();
            
            $table->foreign('pillar_id')->references('id')->on('pillars')->onDelete('cascade');
            $table->foreign('year')->references('year')->on('years')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('initiatives');
    }
};
