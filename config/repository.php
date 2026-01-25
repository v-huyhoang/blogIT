<?php

return [
    'cache' => [
        'enabled' => env('REPOSITORY_CACHE', true),
        'ttl' => (int) env('REPOSITORY_CACHE_TTL', 300),
        'use_tags' => env('REPOSITORY_CACHE_TAGS', true),
        'prefix' => env('REPOSITORY_CACHE_PREFIX', 'repo'),
    ],
];
