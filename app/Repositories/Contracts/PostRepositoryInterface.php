<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

interface PostRepositoryInterface extends BaseRepositoryInterface, SoftDeletesRepository {}
