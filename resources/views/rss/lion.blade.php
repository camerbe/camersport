{{-- resources/views/rss/feed.blade.php --}}
{!! '<'.'?xml version="1.0" encoding="UTF-8"?>' !!}
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
    <channel>
        <title>Le flux rss de camer-sport.com</title>
        <link>{{ url('/')  }}</link>
        <description><![CDATA[La référence du sport camerounais]]></description>
        <language>fr-FR</language>
        <lastBuildDate>{{ now()->toRssString() }}</lastBuildDate>
        <atom:link href="https://pubsubhubbub.appspot.com/" rel="hub"/>
        <atom:link href="{{ url('/') }}/rss/lion" rel="self" type="application/rss+xml" />

        @foreach($items as $item)
            @php
                $image=\App\Helpers\ImageHelper::extractImgSrc($item->image);
                $media=$item->getFirstMedia('article');
                //dd($media->original_url);
                $titre=\App\Helpers\ImageHelper::appendCountryIfFound($item->titre,$item->bled->pays)
            @endphp
            <item>
                <title><![CDATA[{{ $titre }}]]></title>
                <link>{{ url('/' . $item->slug) }}</link>
                <description><![CDATA[
                    <p>{!! $item->chapeau !!}</p>
                    @if($item->image)
                        <p><img src="{{$media->original_url}}" alt="{{ $item->titre }}" width="600"/></p>
                    @endif
                    ]]>
                </description>
                <guid isPermaLink="true">{{ url('/' . $item->slug) }}</guid>
                <pubDate>{{ $item->created_at->toRssString() }}</pubDate>
                @if($item->auteur)
                    <author>{{'camer.be@gmail.com' }} {{'('.$item->auteur.')'}}</author>
                @endif
                @if($item->categorie)
                    <category>{{ $item->categorie->categorie }}</category>
                @endif
                @if($image)
                    <enclosure url="{{ $media->original_url}}" type="{{$media->mime_type}}" length="{{$media->size}}" />
                    <media:thumbnail url="{{ $media->original_url }}" />
                @endif
            </item>
        @endforeach
    </channel>
</rss>

