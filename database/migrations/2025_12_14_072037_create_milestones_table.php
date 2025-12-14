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
        Schema::create('milestones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('initiative_id')->constrained()->onDelete('cascade');
            $table->integer('milestone_number');
            $table->string('milestone_name');
            $table->text('description')->nullable();
            $table->date('target_date');
            $table->enum('status', ['not_started', 'in_progress', 'completed', 'delayed'])->default('not_started');
            $table->timestamps();
            
            $table->unique(['initiative_id', 'milestone_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('milestones');
    }
};
