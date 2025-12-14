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
        Schema::create('initiative_stakeholders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('initiative_id')->constrained()->onDelete('cascade');
            $table->integer('stakeholder_number');
            $table->string('stakeholder_name');
            $table->string('role');
            $table->string('department');
            $table->string('contact')->nullable();
            $table->enum('involvement_level', ['low', 'medium', 'high'])->default('medium');
            $table->timestamps();
            
            $table->unique(['initiative_id', 'stakeholder_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('initiative_stakeholders');
    }
};
