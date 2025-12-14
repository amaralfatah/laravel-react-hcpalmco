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
        Schema::create('risk_mitigations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('risk_id')->nullable();
            $table->unsignedBigInteger('initiative_id');
            $table->text('mitigation_description');
            $table->enum('status', ['planned', 'in_progress', 'completed'])->default('planned');
            $table->integer('display_order');
            $table->timestamps();
            
            $table->foreign('risk_id')->references('id')->on('risks')->onDelete('set null');
            $table->foreign('initiative_id')->references('id')->on('initiatives')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('risk_mitigations');
    }
};
