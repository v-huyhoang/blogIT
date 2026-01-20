<?php

declare(strict_types=1);

namespace App\Repositories\Decorators;

use App\Models\Post;
use App\Repositories\Contracts\PostRepositoryInterface;
use App\Repositories\Events\RepositoryChanged;
use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Support\Facades\Event;

final class EventfulPostRepository extends SoftDeleteEventfulRepository implements PostRepositoryInterface
{
    public function duplicate(Post $model): Post
    {
        if (! $this->inner instanceof PostRepositoryInterface) {
            throw new RepositoryException('Inner repository does not implement PostRepositoryInterface.');
        }

        $result = $this->inner->duplicate($model);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $result;
    }

    public function publish(Post $model): Post
    {
        if (! $this->inner instanceof PostRepositoryInterface) {
            throw new RepositoryException('Inner repository does not implement PostRepositoryInterface.');
        }

        $result = $this->inner->publish($model);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $result;
    }

    public function unpublish(Post $model): Post
    {
        if (! $this->inner instanceof PostRepositoryInterface) {
            throw new RepositoryException('Inner repository does not implement PostRepositoryInterface.');
        }

        $result = $this->inner->unpublish($model);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $result;
    }
}
