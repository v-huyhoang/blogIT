<?php

namespace App\Traits;

trait HasSeo
{
    public function defaultSeo(): array
    {
        return [
            'title' => config('seo.meta.title'),
            'description' => config('seo.meta.description'),
            'image' => config('seo.meta.image'),
            'type' => config('seo.open_graph.type'),
        ];
    }

    public function mergeSeo(array $override): array
    {
        return array_merge($this->defaultSeo(), array_filter($override));
    }
}
