{{-- resources/views/rss/feeds-google-news.blade.php --}}
{!! '<'.'?xml version="1.0" encoding="UTF-8"?>' !!}
<rss version="2.0"
     xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:georss="http://www.georss.org/georss">
    <channel>
        <title>{{ config('app.name') . ' - Google News' }}</title>
        <link>{{ url('/').'/rss/google-news'}}</link>
        <description>{{'Actualités Google News de camer-sport.com'}}</description>
        <language>{{'fr'}}</language>
        <copyright>Copyright {{ date('Y') }} {{ config('app.name') }}</copyright>
        <managingEditor>{{'camer.be@gmail.com'}} {{'(Équipe éditoriale de camer-sport.com)'}}</managingEditor>
        <webMaster>{{'camer.be@gmail.com'}} {{'(Webmaster)'}}</webMaster>
        <pubDate>{{\Carbon\Carbon::parse($items[0]->date_parution)->toRssString()}}</pubDate>
        <lastBuildDate>{{\Carbon\Carbon::parse($items[0]->date_parution)->toRssString()}}</lastBuildDate>
        <generator>{{ config('app.name') }} RSS Generator</generator>
        <docs>https://www.rssboard.org/rss-specification</docs>
        <ttl>60</ttl>
        <atom:link href="{{ url('/').'/rss/google-news' }}" rel="self" type="application/rss+xml" />
        <atom:link href="https://pubsubhubbub.appspot.com/" rel="hub"/>
        <image>
            <url>{{ asset('images/logo-rss.png') }}</url>
            <title>{{ config('app.name') . ' - Google News' }}</title>
            <link>{{url('/').'/rss/google-news'  }}</link>
            <description>Logo {{ config('app.name') }}</description>
            <width>144</width>
            <height>144</height>
        </image>

        @foreach($items as $item)
            @php
                $image=\App\Helpers\ImageHelper::extractImgSrc($item->image);
                $media=$item->getFirstMedia('article');
                $titre=\App\Helpers\ImageHelper::appendCountryIfFound($item->titre,$item->bled->pays)
            @endphp
            <item>

                <title><![CDATA[{{ $titre }}]]></title>
                <link>{{ url(env('FRONTEND_URL').'/' . $item->slug) }}</link>
                <description><![CDATA[{{ $item->chapeau }}]]></description>
                <guid isPermaLink="true">{{ url(env('FRONTEND_URL').'/' . $item->slug) }}</guid>
                <pubDate>{{ $item->updated_at->toRssString() }}</pubDate>

                @if($item->auteur)
                    <author>{{'camer.be@gmail.com' }} {{'('.$item->auteur.')'}}</author>
                    <dc:creator>{{ $item->auteur }}</dc:creator>
                @endif

                @if(isset($item->categorie))
                    <category>{{ $item->categorie->categorie}}</category>
                @endif

                <content:encoded><![CDATA[{!! $item->article ?? $item->chapeau !!}]]></content:encoded>


                <news:news>

                    <news:publication>
                        <news:name>{{ config('app.name') }}</news:name>
                        <news:language>{{'fr'}}</news:language>
                    </news:publication>

                    <news:publication_date>{{  \Carbon\Carbon::parse($item->date_parution)->toAtomString() }}</news:publication_date>

                    <news:title><![CDATA[{{ $titre }}]]></news:title>

                    @if(isset($item->motclef))
                        <news:keywords>{{ App\Helpers\ImageHelper::extractNonHashtagWords($item->motclef) }}</news:keywords>
                    @endif

                    @if(isset($item->article))
                        <news:genres>{{'Blog'}}</news:genres>
                    @endif
                </news:news>

                @if(isset($image))
                    <media:content
                        url="{{ $media->original_url }}"
                        type="{{$media->mime_type}}"
                        medium="image">
                        @if(isset($item->titre))
                            <media:description><![CDATA[{{ $titre }}]]></media:description>
                        @endif
                        @if(isset($item->extra['image_copyright']))
                            <media:copyright>{{'camer-sport.com'}}</media:copyright>
                        @endif
                    </media:content>


                    <enclosure
                        url="{{ $media->original_url }}"
                        type="{{$media->mime_type}}"
                        length="{{$media->size}}" />
                @endif


                <dc:date>{{  \Carbon\Carbon::parse($item->date_parution)->toAtomString() }}</dc:date>
                <dc:type>Text</dc:type>
                <dc:format>text/xml</dc:format>
                <dc:language>{{'fr'}}</dc:language>
                <dc:rights>Copyright {{ date('Y') }} {{ config('app.name') }}</dc:rights>


                @if(isset($item->source))
                    <source url="{{ $item->source }}">{{ $item->source }}</source>
                @endif


            </item>
        @endforeach
    </channel>
</rss>
