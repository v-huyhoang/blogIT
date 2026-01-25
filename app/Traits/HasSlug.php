<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\QueryException;
use Illuminate\Support\Str;

/**
 * Trait HasSlug
 *
 * Provides automatic unique slug generation with race-condition mitigation.
 * See documents/features/repository-pattern-guide.md for design details.
 */
trait HasSlug
{
    /**
     * Boot the trait.
     */
    protected static function bootHasSlug(): void
    {
        static::creating(function (Model $model) {
            static::setSlug($model);
        });

        static::updating(function (Model $model) {
            $slugCol = static::getSlugColName();
            $slugFrom = static::getSlugFromName();

            // 1. If manual slug edited, always re-validate/normalize
            if ($model->isDirty($slugCol)) {
                static::setSlug($model);

                return;
            }

            // 2. Check if update regeneration is enabled
            if (! static::getSlugConfig('slugUpdate', false)) {
                return;
            }

            // 3. Check dirtiness if configured
            if (static::getSlugConfig('slugUpdateOnDirty', true) && ! $model->isDirty($slugFrom)) {
                return;
            }

            static::setSlug($model);
        });
    }

    /**
     * Override save to provide race-condition retry logic.
     */
    public function save(array $options = []): bool
    {
        if (! static::getSlugConfig('slugRetry', false)) {
            return parent::save($options);
        }

        $attempt = 0;
        $max = static::getSlugConfig('slugRetryMax', 3);

        while ($attempt <= $max) {
            try {
                return parent::save($options);
            } catch (QueryException $e) {
                if ($attempt >= $max || ! $this->isDupKey($e)) {
                    throw $e;
                }

                $attempt++;
                static::setSlug($this, $attempt);
            }
        }

        return false;
    }

    /**
     * Main entry point for setting the slug on the model.
     */
    protected static function setSlug(Model $model, int $retryAttempt = 0): void
    {
        $slugCol = static::getSlugColName();
        $slugFrom = static::getSlugFromName();

        // Priority: Manual Input > Source Column > Random Fallback
        if (! empty($model->{$slugCol}) && $model->isDirty($slugCol)) {
            $base = Str::slug($model->{$slugCol});
        } elseif (! empty($model->{$slugFrom})) {
            $base = Str::slug($model->{$slugFrom});
        } else {
            $base = Str::slug($model->{$slugCol} ?? Str::random(8));
        }

        $model->{$slugCol} = static::uniqueSlug($model, $base, $retryAttempt);
    }

    /**
     * Efficiently find a unique slug using exists() queries.
     */
    protected static function uniqueSlug(Model $model, string $base, int $startSuffix = 0): string
    {
        $candidate = $base;
        $suffix = $startSuffix;

        while (static::slugExists($model, $candidate)) {
            $suffix++;
            $candidate = "{$base}-{$suffix}";
        }

        return $candidate;
    }

    /**
     * Check if a candidate slug is already taken.
     */
    protected static function slugExists(Model $model, string $candidate): bool
    {
        $slugCol = static::getSlugColName();
        $isSoftDeletable = in_array(SoftDeletes::class, class_uses_recursive($model), true);
        $acrossTrashed = static::getSlugConfig('slugAcrossTrashed', false);

        $query = ($isSoftDeletable && $acrossTrashed)
            ? static::withTrashed()
            : static::query();

        return $query->toBase()
            ->where($slugCol, $candidate)
            ->when($model->exists, fn ($q) => $q->where($model->getKeyName(), '!=', $model->getKey()))
            ->exists();
    }

    /**
     * Detect MySQL duplicate key errors.
     */
    protected function isDupKey(QueryException $e): bool
    {
        return $e->getCode() === '23000' || str_contains($e->getMessage(), '1062');
    }

    /**
     * Configuration helper to avoid property collision errors.
     */
    protected static function getSlugConfig(string $key, mixed $default): mixed
    {
        return property_exists(static::class, $key) ? static::${$key} : $default;
    }

    protected static function getSlugColName(): string
    {
        return static::getSlugConfig('slugCol', 'slug');
    }

    protected static function getSlugFromName(): string
    {
        return static::getSlugConfig('slugFrom', 'name');
    }

    public function getRouteKeyName(): string
    {
        if (static::getSlugConfig('slugRouteKey', false)) {
            return $this->getSlugColName();
        }

        return parent::getRouteKeyName();
    }
}
