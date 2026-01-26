<?php

declare(strict_types=1);

namespace App\Repositories\Cache;

use App\Repositories\Contracts\TagRepositoryInterface;

final class CachedTagRepository extends CachedRepository implements TagRepositoryInterface {}
