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
		Schema::create('customers', function (Blueprint $table) {
			$table->id();

			$table->string('name')->nullable()->comment('Customer name');
			$table->string('phone')->unique()->comment('Phone number (used as primary key to identify)');
			$table->string('email')->nullable()->unique()->comment('Email');
			$table->string('address')->nullable()->comment('Address');

			$table->integer('total_spent')->default(0)->comment('Total spent for classification purposes');
			$table->integer('loyalty_points')->default(0)->comment('Loyalty points (for loyalty programs)');

			$table->string('membership_rank')->default('Standard')->comment('Membership rank (e.g., Standard, Silver, Gold, Platinum)');

			$table->text('notes')->nullable()->comment('Additional notes about the customer');
			$table->boolean('is_active')->default(true)->comment('Active status');

			// Timestamps
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('customers');
	}
};
