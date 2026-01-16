<?php

declare(strict_types=1);

namespace App\Repositories\Decorators;

use App\Repositories\Contracts\PostRepositoryInterface;

final class EventfulPostRepository extends SoftDeleteEventfulRepository implements PostRepositoryInterface {}
