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
        Schema::create('monthly_progress', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('action_plan_id');
            $table->integer('year');
            $table->integer('month'); // 1-12
            $table->decimal('progress', 5, 2)->default(0.00);
            $table->decimal('yearly_impact', 5, 2)->default(0.00);
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->foreign('action_plan_id')->references('id')->on('action_plans')->onDelete('cascade');
            $table->unique(['action_plan_id', 'year', 'month'], 'unique_monthly_progress');
            $table->index(['action_plan_id', 'year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monthly_progress');
    }
};