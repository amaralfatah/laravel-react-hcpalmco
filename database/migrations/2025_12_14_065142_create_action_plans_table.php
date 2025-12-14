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
        Schema::create('action_plans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('initiative_id');
            $table->integer('activity_number');
            $table->text('activity_name');
            $table->enum('project_manager_status', ['green', 'yellow', 'red', 'blue'])->default('blue');
            $table->string('due_date')->nullable();
            $table->decimal('current_month_progress', 5, 2)->default(0.00);
            $table->decimal('cumulative_progress', 5, 2)->default(0.00);
            $table->integer('display_order');
            $table->timestamps();
            
            $table->foreign('initiative_id')->references('id')->on('initiatives')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('action_plans');
    }
};
