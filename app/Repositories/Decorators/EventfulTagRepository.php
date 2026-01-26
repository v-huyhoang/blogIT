<?php

declare(strict_types=1);

namespace App\Repositories\Decorators;

use App\Repositories\Contracts\TagRepositoryInterface;

final class EventfulTagRepository extends EventfulRepository implements TagRepositoryInterface {}
