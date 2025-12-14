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
        Schema::create('initiative_parenting', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('initiative_id');
            $table->unsignedBigInteger('parenting_model_id');
            $table->timestamps();
            
            $table->foreign('initiative_id')->references('id')->on('initiatives')->onDelete('cascade');
            $table->foreign('parenting_model_id')->references('id')->on('parenting_models')->onDelete('cascade');
            $table->unique(['initiative_id', 'parenting_model_id'], 'unique_initiative_parenting');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('initiative_parenting');
    }
};
