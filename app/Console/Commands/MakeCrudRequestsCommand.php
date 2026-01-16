<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

final class MakeCrudRequestsCommand extends Command
{
    protected $signature = 'make:crud-requests
                            {resource : Resource name, e.g. Post (will create Requests/Post/*)}
                            {--no-prefix : Create requests in root Requests folder without prefix}';

    protected $description = 'Create Store and Update FormRequest classes (optionally prefixed by resource folder)';

    public function handle(): int
    {
        $resource = Str::studly($this->argument('resource'));

        $prefix = $this->option('no-prefix') ? '' : "{$resource}/";

        // => Post/PostStoreRequest, Post/PostUpdateRequest
        $this->callSilent('make:request', ['name' => "{$prefix}{$resource}StoreRequest"]);
        $this->callSilent('make:request', ['name' => "{$prefix}{$resource}UpdateRequest"]);

        $this->info('✔ Requests created:');
        $this->line("- {$prefix}{$resource}StoreRequest");
        $this->line("- {$prefix}{$resource}UpdateRequest");

        return self::SUCCESS;
    }
}
