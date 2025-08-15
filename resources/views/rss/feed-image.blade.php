{{-- resources/views/rss/feed-image.blade.php --}}
{!! '<'.'?xml version="1.0" encoding="UTF-8"?>' !!}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    @foreach($items as $item)
        @php
            $image=\App\Helpers\ImageHelper::extractImgSrc($item->image);
            $media=$item->getFirstMedia('article');
            $titre=\App\Helpers\ImageHelper::appendCountryIfFound($item->titre,$item->bled->pays)
        @endphp
        <url>
            <loc>{{ url(env('FRONTEND_URL').'/' . $item->slug) }}</loc>
            <image:image>
                <image:loc>{{ $media->original_url }}</image:loc>
                <image:title><![CDATA[{{ $titre }}]]></image:title>
                <image:caption><![CDATA[{{ $item->titre }}]]></image:caption>
            </image:image>
            <lastmod>{{  \Carbon\Carbon::parse($item->date_parution)->toAtomString() }}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>
    @endforeach
</urlset>
