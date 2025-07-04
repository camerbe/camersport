{{-- resources/views/rss/feed.blade.php --}}
{!! '<'.'?xml version="1.0" encoding="UTF-8"?>' !!}
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
    <channel>
        <title>Le flux rss de camer-sport.com</title>
        <link>{{ url('/')  }}</link>
        <description><![CDATA[La référence du sport camerounais]]></description>
        <language>fr-FR</language>
        <lastBuildDate>{{ now()->toRssString() }}</lastBuildDate>
        <atom:link href="{{ url('/') }}/rss" rel="self" type="application/rss+xml" />

        @foreach($items as $item)
            @php
                $image=\App\Helpers\ImageHelper::extractImgSrc($item->image);
                $media=$item->getFirstMedia('article');
                //dd($media);
                $titre=\App\Helpers\ImageHelper::appendCountryIfFound($item->titre,$item->bled->pays)
            @endphp
            <item>
                <title><![CDATA[{{ $titre }}]]></title>
                <link>{{ url(env('FRONTEND_URL').'/article/' . $item->slug) }}</link>
                <description><![CDATA[
                    <p>{!! $item->chapeau !!}</p>
                    @if($item->image)
                        <p><img src="{{$media->url}}" alt="{{ $item->titre }}" width="600"/></p>
                    @endif
                    ]]>
                </description>
                <guid isPermaLink="true">{{ url('api/articles/slug/' . $item->slug) }}</guid>
                <pubDate>{{ $item->created_at->toRssString() }}</pubDate>
                @if($item->auteur)
                    <author>{{'camer.be@gmail.com' }} {{'('.$item->auteur.')'}}</author>
                @endif
                @if($item->category)
                    <category>{{ $item->category->name }}</category>
                @endif
                @if($item->image)
                    <enclosure url="{{ $image }}" type="{{$media->mime_type}}" length="{{$media->size}}" />
                    <media:thumbnail url="{{ $image }}" />
                @endif
            </item>
        @endforeach
    </channel>
</rss>

