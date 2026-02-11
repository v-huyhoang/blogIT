<?php

namespace App\Models;

use App\Traits\Filterable;
use Spatie\Permission\Models\Permission as ModelsPermission;

class Permission extends ModelsPermission
{
    use Filterable;

    protected $searchable = [
        'name',
        'description',
    ];

    protected $table = 'permissions';

    protected $fillable = [
        'name',
        'guard_name',
        'description',
    ];
}
