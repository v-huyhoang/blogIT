<?php

namespace App\Factories;

use App\DTOs\Seo\PageSeoDTO;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Pagination\LengthAwarePaginator;

class SeoFactory
{
    /**
     * Home Page SEO
     */
    public function home(): PageSeoDTO
    {
        return new PageSeoDTO(
            title: 'Home',
            description: 'Welcome to BlogIT - The ultimate platform for sharing tech insights.',
            type: 'website',
            schema: [
                '@type' => 'WebSite',
                'name' => config('seo.open_graph.site_name'),
                'url' => url('/'),
            ]
        );
    }

    /**
     * Articles Index SEO (+ pagination)
     */
    public function articlesIndex(
        ?LengthAwarePaginator $articles = null
    ): PageSeoDTO {

        return new PageSeoDTO(
            title: 'Articles',
            description: 'Browse our latest technical articles and tutorials.',
            type: 'website',
            pagination: $articles ? [
                'prev' => $articles->previousPageUrl(),
                'next' => $articles->nextPageUrl(),
            ] : null,
            schema: [
                '@type' => 'CollectionPage',
                'name' => 'Articles',
                'url' => url('/articles'),
            ]
        );
    }

    /**
     * Category Page SEO
     */
    public function categoryIndex(): PageSeoDTO
    {
        return new PageSeoDTO(
            title: 'Categories',
            description: 'Browse our technical articles by category. Find deep dives on various tech topics.',
        );
    }

    /**
     * Tag Page SEO
     */
    public function tagIndex(): PageSeoDTO
    {
        return new PageSeoDTO(
            title: 'Tags',
            description: 'Explore tech topics through tags. Find exactly what you are looking for by following specific interests.',
        );
    }
}
