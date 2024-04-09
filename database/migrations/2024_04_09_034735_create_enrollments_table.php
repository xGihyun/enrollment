<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id()->primary();
            $table->timestamp('enrolled_at')->default(DB::raw('current_timestamp()'));
            $table->string('year', 11);
            $table->string('level');
            $table->string('section');
            $table->enum('tuition_plan', ['a', 'b', 'c', 'd']);
            $table->enum('status', ['pending', 'done'])->default('pending');
            $table->foreignId('student_id')->references('id')->on('users');
            $table->string('payment_receipt_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
