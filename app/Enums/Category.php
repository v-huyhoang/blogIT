<?php

namespace App\Enums;

enum Category: int
{
    case ACTIVE = 1;

    case INACTIVE = 0;

    // case GET_ROOT = true; // Cannot be int-backed enum. Moved to method or removed if unused as enum case.

    public static function toArray(): array
    {
        return [
            self::ACTIVE->value => 'Active',
            self::INACTIVE->value => 'Inactive',
        ];
    }

    // Retain helper method but remove invalid case
    public static function getRoot(): bool
    {
        return true;
    }
}
