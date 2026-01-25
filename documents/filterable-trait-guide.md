# Filterable Trait Guide

The `Filterable` trait provides a powerful and flexible way to handle database filtering through URL parameters. It bridges the gap between frontend requests and Eloquent queries, supporting direct columns, relationships, and complex logic.

---

## 1. Basic Setup

To enable filtering on a model, simply use the trait and (optionally) define the `$allowedFilters` and `$searchable` properties.

```php
namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use Filterable;

    // Columns that can be filtered directly (e.g., ?status=published)
    protected array $allowedFilters = [
        'id', 'status', 'category_id', 'user_id'
    ];

    // Columns included in global search (e.g., ?q=keyword)
    protected array $searchable = [
        'title', 'excerpt'
    ];
}
```

---

## 2. The Internal Flow

When you call `$query->filter($filters)` in your repository or controller, the trait follows this priority list for every key-value pair in the array:

1. **Custom Filter Method**: Checks if a method named `filter{StudlyKey}` exists (e.g., `tag_id` -> `filterTagId`). If yes, it executes that.
2. **Relational Filter**: If the key contains a dot (e.g., `user.name`), it performs a `whereHas` query automatically.
3. **Standard Column Filter**: If the key matches a column in `$allowedFilters`:
    * If the value is an array, it uses `WHERE IN (...)`.
    * Otherwise, it uses `WHERE column = value`.

---

## 3. Filtering Cases & Examples

### Case 1: Direct Column (Exact Match)

Used for simple fields like status or foreign keys that exist directly on the model's table.

* **Request**: `?status=published&category_id=5`
* **Resulting SQL**: `WHERE status = 'published' AND category_id = 5`

### Case 2: Custom Filter Methods (Relationships)

Essential for many-to-many relationships or complex logic where the key doesn't match a table column.

* **Request**: `?tag_id=10`
* **Requirement**: You must define a method in your Model following the `filter{Key}` syntax.

```php
// In Post.php
public function filterTagId($query, $value)
{
    $query->whereHas('tags', fn($q) => $q->where('tags.id', $value));
}
```

### Case 3: Comparison / Range Filtering

The pipeline supports suffixes like `_from`, `_to`, `_gte`, `_lte`.

* **Request**: `?published_at_from=2023-01-01&views_count_gte=100`
* **Resulting SQL**: `WHERE published_at >= '2023-01-01' AND views_count >= 100`

### Case 4: Global Search

Uses the `$searchable` array defined in the model.

* **Request**: `?q=laravel`
* **Resulting SQL**: `WHERE (title LIKE '%laravel%' OR excerpt LIKE '%laravel%')`

### Case 5: Relational "Dot" Filtering

Filters based on columns in a related table.

* **Request**: `?user.email=admin@example.com`
* **Resulting SQL**: `WHERE EXISTS (SELECT * FROM users WHERE posts.user_id = users.id AND email = 'admin@example.com')`

### Case 6: Trashed (Soft Deletes)

Controlled by the `TrashedFilter` pipe in the pipeline.

* **Request**: `?trashed=only` (Options: `with`, `only`)
* **Resulting SQL**: `WHERE deleted_at IS NOT NULL`

---

## 4. Summary Table

| Syntax Case | Example Key | Logic Type | Implementation |
| :--- | :--- | :--- | :--- |
| **Exact Column** | `status` | Direct `WHERE` | Add to `$allowedFilters` |
| **Custom / Relation** | `tag_id` | `filterTagId()` | **Required** in Model |
| **Range / Op** | `price_gte` | `WHERE >=` | Automatic via Pipeline |
| **Search** | `q` | `LIKE` search | Add to `$searchable` |
| **Relationship** | `user.name` | `whereHas()` | Automatic via Trait |
| **Soft Deletes** | `trashed` | `withTrashed()` | Automatic via Pipeline |

---

## 5. Sample Usage in Repository

```php
public function paginate($perPage, $filters = [])
{
    $query = $this->model->newQuery();

    // The applyFilters method inside the BaseRepository 
    // sends the data through the pipeline (Sort, Search, Trashed, ColumnFilter)
    $this->applyFilters($query, $filters);

    return $query->paginate($perPage);
}
```
