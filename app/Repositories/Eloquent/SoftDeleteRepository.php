<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\SoftDeletesRepository;
use App\Repositories\Eloquent\Concerns\HandlesSoftDeletes;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SoftDeleteRepository
 *
 * @template TModel of Model
 *
 * @extends BaseRepository<TModel>
 *
 * @implements SoftDeletesRepository
 */
abstract class SoftDeleteRepository extends BaseRepository implements SoftDeletesRepository
{
    use HandlesSoftDeletes;
}
