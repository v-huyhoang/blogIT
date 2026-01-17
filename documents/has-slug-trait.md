# 📌 `HasSlug` Trait

---

## 1. Overview

The `HasSlug` trait provides a robust way to generate SEO-friendly, unique slugs for any Eloquent model. It is designed to be efficient, predictable, and safe under concurrent write operations.

### Key Features

- **Automatic Generation:** Hooks into `creating` and `updating` Eloquent events.
- **Race-Condition Mitigation:** Overrides `save()` to retry generation if a database unique constraint violation occurs.
- **Memory Efficient:** Uses `exists()` queries instead of loading large collections into memory.
- **Configurable:** Fine-grained control over source columns, update behavior, and soft-delete policies.

---

## 2. Configuration Options

Configure the trait by defining static properties on your Model. All properties are optional and have sensible defaults.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `$slugFrom` | `string` | `'name'` | The source column to generate the slug from. |
| `$slugCol` | `string` | `'slug'` | The column where the slug is stored. |
| `$slugUpdate` | `bool` | `false` | Whether to regenerate the slug when the source column changes. |
| `$slugUpdateOnDirty` | `bool` | `true` | Only regenerate if the source column is actually changed. |
| `$slugRetry` | `bool` | `false` | Enable automatic retry on `QueryException` (duplicate key). |
| `$slugRetryMax` | `int` | `3` | Maximum number of retry attempts. |
| `$slugAcrossTrashed` | `bool` | `false` | Check for uniqueness against soft-deleted records. |
| `$slugRouteKey` | `bool` | `false` | Use the slug column as the Route Model Binding key. |

---

## 3. Usage Examples

### Basic Usage

Default settings (slug from `name`, stored in `slug`, no update regeneration).

```php
use App\Traits\HasSlug;

class Tag extends Model {
    use HasSlug;
}
```

### Full Configuration (e.g., Post Model)

Slug from `title`, updates on title change, unique across trashed records, and used for routing.

```php
use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model {
    use SoftDeletes, HasSlug;

    protected static string $slugFrom = 'title';
    protected static bool $slugUpdate = true;
    protected static bool $slugAcrossTrashed = true;
    protected static bool $slugRouteKey = true;
    protected static bool $slugRetry = true;
}
```

---

## 4. Execution Flow

### Creation / Update Flow

1. **Event Triggered:** `creating` or `updating` event fires.
2. **Base Selection:** The trait picks a base string from the source column, a manually provided slug, or a random fallback.
3. **Uniqueness Loop:**
    - Checks if the slug exists via `exists()` query.
    - If it exists, appends a suffix (`-1`, `-2`, etc.) and checks again.
4. **Assignment:** The final unique slug is assigned to the model's attribute.

### Race-Condition (Retry) Flow

1. **Save Attempt:** `parent::save()` is called inside a `try-catch` block.
2. **Conflict Detected:** If a MySQL `1062` (Duplicate entry) error occurs and `$slugRetry` is enabled:
    - The retry attempt counter increments.
    - A new slug is generated using the updated attempt as a starting suffix.
    - `save()` is called again.
3. **Completion:** Success or re-throwing the exception after `$slugRetryMax` is reached.

---

## 5. Database Requirements

To ensure data integrity, you **must** add a unique index to your slug column in the migration:

```php
Schema::create('posts', function (Blueprint $table) {
    $table->string('slug')->unique();
});
```

---

## 6. Testing

The trait is verified via `Tests\Feature\HasSlugTest`.
Ensure you test:

- Unique suffix incrementing.
- Soft delete collision behavior.
- Manual slug overrides.
- Update regeneration logic.
