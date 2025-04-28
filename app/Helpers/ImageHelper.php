<?php

namespace App\Helpers;

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


}
