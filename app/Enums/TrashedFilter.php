<?php

namespace App\Enums;

enum TrashedFilter: string
{
    case With = 'with';
    case Only = 'only';

    public static function values(): array
    {
        return [self::With, self::Only];
    }
}
