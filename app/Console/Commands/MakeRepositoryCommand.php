<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;
use RuntimeException;

final class MakeRepositoryCommand extends Command
{
    protected $signature = 'make:repo {name : Model name, e.g. Post}
                            {--soft : Generate soft-delete capability (extends SoftDeletesRepository, wrappers use soft decorators)}';

    protected $description = 'Generate repository contract + eloquent repo + cached/eventful wrappers and bind into RepositoryServiceProvider';

    public function __construct(private readonly Filesystem $files)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $name = trim((string) $this->argument('name'));
        if ($name === '') {
            $this->error('Name is required.');

            return self::FAILURE;
        }

        $studly = Str::studly($name);              // Post
        $var = Str::camel($studly);             // post
        $soft = (bool) $this->option('soft');

        // Paths
        $contractPath = app_path("Repositories/Contracts/{$studly}RepositoryInterface.php");
        $eloquentPath = app_path("Repositories/Eloquent/{$studly}Repository.php");
        $cachedPath = app_path("Repositories/Cache/Cached{$studly}Repository.php");
        $eventfulPath = app_path("Repositories/Decorators/Eventful{$studly}Repository.php");
        $providerPath = app_path('Providers/RepositoryServiceProvider.php');

        // Ensure dirs
        $this->ensureDir(dirname($contractPath));
        $this->ensureDir(dirname($eloquentPath));
        $this->ensureDir(dirname($cachedPath));
        $this->ensureDir(dirname($eventfulPath));

        // Guard not overwrite
        $this->guardNotExists($contractPath);
        $this->guardNotExists($eloquentPath);
        $this->guardNotExists($cachedPath);
        $this->guardNotExists($eventfulPath);

        // Generate files
        $this->files->put($contractPath, $this->contractStub($studly, $soft));
        $this->files->put($eloquentPath, $this->eloquentStub($studly, $soft));
        $this->files->put($cachedPath, $this->cachedStub($studly, $soft));
        $this->files->put($eventfulPath, $this->eventfulStub($studly, $soft));

        $this->info('Created:');
        $this->line("- {$this->relative($contractPath)}");
        $this->line("- {$this->relative($eloquentPath)}");
        $this->line("- {$this->relative($cachedPath)}");
        $this->line("- {$this->relative($eventfulPath)}");

        // Insert bind line
        if (! $this->files->exists($providerPath)) {
            $this->warn("Provider not found at {$this->relative($providerPath)}. Skipped binding insertion.");
            $this->warn("Add manually: \$this->bindRepo({$studly}RepositoryInterface::class, {$studly}Repository::class);");

            return self::SUCCESS;
        }

        $this->insertBinding($providerPath, $studly);

        $this->info('Binding inserted into RepositoryServiceProvider.');
        $this->info('Done.');

        return self::SUCCESS;
    }

    private function ensureDir(string $dir): void
    {
        if (! $this->files->isDirectory($dir)) {
            $this->files->makeDirectory($dir, 0755, true);
        }
    }

    private function guardNotExists(string $path): void
    {
        if ($this->files->exists($path)) {
            throw new RuntimeException("File already exists: {$path}");
        }
    }

    private function insertBinding(string $providerPath, string $studly): void
    {
        $content = $this->files->get($providerPath);

        $start = 'REPO_BINDINGS:START';
        $end = 'REPO_BINDINGS:END';

        if (! str_contains($content, $start) || ! str_contains($content, $end)) {
            $this->warn('Markers not found in RepositoryServiceProvider.');
            $this->warn('Add these markers inside register():');
            $this->warn("// {$start}");
            $this->warn("// {$end}");
            $this->warn('Then re-run the command OR add binding manually.');

            return;
        }

        $line = "\$this->bindRepo(\\App\\Repositories\\Contracts\\{$studly}RepositoryInterface::class, \\App\\Repositories\\Eloquent\\{$studly}Repository::class);";

        // Avoid duplicates
        if (str_contains($content, $line)) {
            $this->warn('Binding line already exists. Skipped.');

            return;
        }

        $pattern = "/(\\/\\/\\s*{$start}\\R)/";
        if (! preg_match($pattern, $content)) {
            $this->warn('Could not locate insertion point. Skipped.');

            return;
        }

        $replacement = "$1    {$line}\n";
        $newContent = preg_replace($pattern, $replacement, $content, 1);

        if (! is_string($newContent)) {
            $this->warn('Failed to update provider content. Skipped.');

            return;
        }

        $this->files->put($providerPath, $newContent);
    }

    private function relative(string $path): string
    {
        $base = base_path();

        return str_starts_with($path, $base) ? ltrim(str_replace($base, '', $path), DIRECTORY_SEPARATOR) : $path;
    }

    private function contractStub(string $studly, bool $soft): string
    {
        $extends = $soft
            ? 'BaseRepositoryInterface, SoftDeletesRepository'
            : 'BaseRepositoryInterface';

        $softUse = $soft ? "use App\\Repositories\\Contracts\\SoftDeletesRepository;\n" : '';

        return <<<PHP
<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

{$softUse}interface {$studly}RepositoryInterface extends {$extends}
{
}

PHP;
    }

    private function eloquentStub(string $studly, bool $soft): string
    {
        $base = $soft ? 'SoftDeleteRepository' : 'BaseRepository';

        return <<<PHP
<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\\Models\\{$studly};
use App\\Repositories\\Contracts\\{$studly}RepositoryInterface;

final class {$studly}Repository extends {$base} implements {$studly}RepositoryInterface
{
    public function model(): string
    {
        return {$studly}::class;
    }
}

PHP;
    }

    private function cachedStub(string $studly, bool $soft): string
    {
        // You already have SoftDeleteCachedRepository / CachedRepository in previous design.
        // If not soft, extend CachedRepository. If soft, extend SoftDeleteCachedRepository.
        $parent = $soft ? 'SoftDeleteCachedRepository' : 'CachedRepository';

        return <<<PHP
<?php

declare(strict_types=1);

namespace App\Repositories\Cache;

use App\Repositories\Contracts\\{$studly}RepositoryInterface;

final class Cached{$studly}Repository extends {$parent} implements {$studly}RepositoryInterface
{
}

PHP;
    }

    private function eventfulStub(string $studly, bool $soft): string
    {
        // If soft, extend SoftDeleteEventfulRepository else EventfulRepository
        $parent = $soft ? 'SoftDeleteEventfulRepository' : 'EventfulRepository';

        return <<<PHP
<?php

declare(strict_types=1);

namespace App\Repositories\Decorators;

use App\Repositories\Contracts\\{$studly}RepositoryInterface;

final class Eventful{$studly}Repository extends {$parent} implements {$studly}RepositoryInterface
{
}

PHP;
    }
}
