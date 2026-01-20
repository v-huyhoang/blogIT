<?php

namespace App\Constants;

class Pagination
{
    public const DEFAULT_PER_PAGE = 15;

    public const OPTIONS = [10, 15, 25, 50, 100];

    public static function getMax(): int
    {
        return max(self::OPTIONS);
    }
}
