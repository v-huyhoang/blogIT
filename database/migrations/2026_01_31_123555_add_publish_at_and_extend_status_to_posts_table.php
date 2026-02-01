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
        Schema::table('posts', function (Blueprint $table) {
            $table->timestamp('publish_at')->nullable()->after('status')->index()->comment('Scheduled publish time');
            $table->timestamp('published_at')->nullable()->comment('Actual published time')->change();
            $table->index(['status', 'publish_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropIndex(['status', 'publish_at']);
            $table->dropIndex(['publish_at']);
            $table->dropColumn('publish_at');
        });
    }
};
