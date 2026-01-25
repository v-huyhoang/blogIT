<?php

namespace App\Models;

use Spatie\Permission\Models\Role as ModelRole;

class Role extends ModelRole
{
    protected $table = 'roles';

    protected $fillable = ['name', 'guard_name', 'description'];
}
