<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class ImageHelper
{
    /**
     * Extracts the src value from an img tag in the given HTML string.
     *
     * @param string $html The HTML content containing the <img> tag
     * @return string|null The src value or null if not found
     */
    public static function extractImgSrc($html){
        if(strpos($html, '<img') !== false){
            preg_match('/<img[^>]+src=["\'](.*?)["\']/', $html, $matches);
            return $matches[1] ?? null;
        }
        return $html;
    }
    public static function  extractNonHashtagWords(string $input): string
    {
        // Sépare la chaîne sur les virgules
        $items = array_map('trim', explode(',', $input));

        // Filtre les éléments qui ne commencent pas par #
        $nonHashtags = array_filter($items, function ($word) {
            return !str_starts_with(trim($word), '#');
        });

        // Recompose la chaîne avec virgule
        return implode(',', $nonHashtags);
    }
    public static function appendCountryIfFound(string $title, string $country): string
    {
        if (!str_contains(strtolower($title), strtolower($country))) {
            return Str::title($country) . ' - ' . $title;
        }

        return $title;
    }

    public static function parseImageUrl(string $string): string
    {
        return str_starts_with($string, 'http')
            ? $string
            : 'https://camer-sport.com' . $string;
    }


}
