# Deferred Loading Guide (Inertia.js 2.0)

This document explains how to use **Deferred Loading**, a powerful feature introduced in Inertia.js 2.0. It allows you to load page data in the background after the initial page load, improving performance and user experience.

## 1. Concept Overview

Normally, Inertia waits for all data to be resolved on the server before sending the page to the browser. If one data source is slow (e.g., an external API or a heavy database query), the whole page is delayed.

**Deferred Loading** changes this:

1. The server sends the page immediately with essential data.
2. The browser renders the page and shows a "fallback" (like a skeleton).
3. The server continues fetching the slow data in the background.
4. Once ready, the data is sent to the browser and the fallback is replaced with the real content.

---

## 2. Backend Implementation

To defer a prop, wrap the data in `Inertia::defer()` within your controller.

### Example: `HomeController.php`

```php
use Inertia\Inertia;
use Inertia\Response;

public function __invoke(): Response
{
    return Inertia::render('Welcome', [
        // Essential data (loaded immediately)
        'title' => 'My Blog',

        // Deferred data (loaded in background)
        'latestPosts' => Inertia::defer(fn () => Post::latest()->take(5)->get()),
        'topAuthors' => Inertia::defer(fn () => User::getTopAuthors()),
    ]);
}
```

---

## 3. Frontend Implementation

On the frontend, use the `<Deferred />` component from `@inertiajs/react` to wrap the sections that depend on deferred data.

### Example: `Welcome.tsx`

```tsx
import { Deferred } from '@inertiajs/react';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import { PostCard } from '@/components/frontend/post-card';

export default function Welcome({ latestPosts }) {
    return (
        <div>
            <h1>Recent Articles</h1>

            {/* The Deferred component handles the loading state */}
            <Deferred 
                data="latestPosts" 
                fallback={<PostCardSkeleton count={3} />}
            >
                <div className="grid grid-cols-3">
                    {latestPosts?.data.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </Deferred>
        </div>
    );
}
```

---

## 4. Key Props of `<Deferred />`

| Prop | Description |
| :--- | :--- |
| `data` | The name of the prop(s) to wait for. Can be a string `"posts"` or an array `["posts", "authors"]`. |
| `fallback` | The React component to show while the data is loading (e.g., Skeletons). |

---

## 5. Advanced Usage

### Grouping Multiple Props

If you have multiple deferred props that should appear together, pass them as an array to the `data` prop. The children will only render once **all** listed props are loaded.

```tsx
<Deferred data={['latestPosts', 'trendingPosts']} fallback={<BigSkeleton />}>
    <Dashboard posts={latestPosts} trending={trendingPosts} />
</Deferred>
```

### Multiple Groups (Parallel Loading)

You can have multiple `<Deferred />` components on the same page. Inertia will fetch them in parallel, and each section will reveal itself as soon as its data is ready.

```tsx
<Deferred data="featured" fallback={<SmallSkeleton />}>
    <FeaturedSection data={featured} />
</Deferred>

<Deferred data="comments" fallback={<LargeSkeleton />}>
    <CommentsSection data={comments} />
</Deferred>
```

---

## 6. Why use this over custom Lazy Loading?

- **SEO Friendly**: Search engines can see that the page has deferred sections.
- **Simpler Code**: No need for `useEffect`, `IntersectionObserver`, or manual `router.reload()` calls.
- **Performance**: Uses HTTP/2 streams or parallel requests depending on the server configuration, making it much faster than manual reloading.
- **Unified State**: The data becomes part of the standard page props once loaded, keeping your React logic clean.

---

## 7. Best Practices

1. **Use Skeletons**: Always provide a `fallback` that matches the layout of the final content to prevent "layout shift."
2. **Defer Heavy Queries Only**: Don't defer everything. Small, fast queries should be loaded normally to avoid unnecessary round-trips.
3. **Group Related Data**: If a section needs both "Post" and "Author" data, group them in one `<Deferred />` to avoid showing half-loaded UI.
