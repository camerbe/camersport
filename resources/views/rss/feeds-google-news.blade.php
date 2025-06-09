{{-- resources/views/rss/feeds.gooble-news.blade.php --}}
{!! '<'.'?xml version="1.0" encoding="UTF-8"?>' !!}
<rss version="2.0"
     xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:georss="http://www.georss.org/georss">
    <channel>
        <title>{{ $meta['title'] }}</title>
        <link>{{ $meta['link'] }}</link>
        <description>{{ $meta['description'] }}</description>
        <language>{{ $meta['language'] }}</language>
        <copyright>Copyright {{ date('Y') }} {{ config('app.name') }}</copyright>
        <managingEditor>{{ config('app.contact_email') }} ({{ config('app.editor_name', 'Équipe éditoriale') }})</managingEditor>
        <webMaster>{{ config('app.webmaster_email', config('app.contact_email')) }} (Webmaster)</webMaster>
        <pubDate>{{ $meta['updated'] }}</pubDate>
        <lastBuildDate>{{ $meta['updated'] }}</lastBuildDate>
        <generator>{{ config('app.name') }} RSS Generator</generator>
        <docs>https://www.rssboard.org/rss-specification</docs>
        <ttl>60</ttl>
        <atom:link href="{{ $meta['url'] }}" rel="self" type="application/rss+xml" />

        <!-- Image du site -->
        <image>
            <url>{{ asset('images/logo-rss.png') }}</url>
            <title>{{ $meta['title'] }}</title>
            <link>{{ url('/')  }}</link>
            <description>Logo {{ config('app.name') }}</description>
            <width>144</width>
            <height>144</height>
        </image>

        @foreach($items as $item)
            <item>
                <!-- BALISES RSS STANDARD OBLIGATOIRES -->
                <title><![CDATA[{{ $item->titre }}]]></title>
                <link>{{ $item->link }}</link>
                <description><![CDATA[{{ $item->summary }}]]></description>
                <guid isPermaLink="true">{{ $item->link }}</guid>
                <pubDate>{{ $item->updated->toRssString() }}</pubDate>

                <!-- BALISES RSS STANDARD OPTIONNELLES -->
                @if($item->auteur)
                    <author>{{ $item->auteur }})</author>
                    <dc:creator>{{ $item->auteur }}</dc:creator>
                @endif

                @if(isset($item->category))
                    <category>{{ $item->category }}</category>
                @endif

                <!-- Contenu complet (optionnel mais recommandé) -->
                <content:encoded><![CDATA[{!! $item->article ?? $item->chapeau !!}]]></content:encoded>

                <!-- BALISES GOOGLE NEWS OBLIGATOIRES -->
                <news:news>
                    <!-- Publication (OBLIGATOIRE) -->
                    <news:publication>
                        <news:name>{{ config('app.name') }}</news:name>
                        <news:language>fr</news:language>
                    </news:publication>

                    <!-- Date de publication (OBLIGATOIRE) -->
                    <news:publication_date>{{ $item->date_parution->toAtomString() }}</news:publication_date>

                    <!-- Titre (OBLIGATOIRE) -->
                    <news:title><![CDATA[{{ $item->titre }}]]></news:title>

                    <!-- BALISES GOOGLE NEWS OPTIONNELLES -->

                    <!-- Mots-clés -->
                    @if(isset($item->extra['keywords']) && $item->extra['keywords'])
                        <news:keywords>{{ $item->extra['keywords'] }}</news:keywords>
                    @endif

                    <!-- Symboles boursiers -->
                    @if(isset($item->extra['stock_tickers']) && $item->extra['stock_tickers'])
                        <news:stock_tickers>{{ $item->extra['stock_tickers'] }}</news:stock_tickers>
                    @endif

                    <!-- Accès (Subscription, Registration, ou vide pour gratuit) -->
                    @if(isset($item->extra['access']) && $item->extra['access'])
                        <news:access>{{ $item->extra['access'] }}</news:access>
                    @endif

                    <!-- Genres d'article -->
                    @if(isset($item->extra['genres']) && $item->extra['genres'])
                        <news:genres>{{ $item->extra['genres'] }}</news:genres>
                    @endif
                </news:news>

                <!-- LOCALISATION GÉOGRAPHIQUE (optionnel) -->
                @if(isset($item->extra['geo_locations']) && $item->extra['geo_locations'])
                    <georss:point>{{ $item->extra['geo_locations'] }}</georss:point>
                @endif

                <!-- IMAGES MÉDIA (optionnel mais recommandé) -->
                @if(isset($item->extra['image_url']) && $item->extra['image_url'])
                    <media:content
                        url="{{ $item->extra['image_url'] }}"
                        type="image/jpeg"
                        medium="image">
                        @if(isset($item->extra['image_caption']))
                            <media:description><![CDATA[{{ $item->extra['image_caption'] }}]]></media:description>
                        @endif
                        @if(isset($item->extra['image_copyright']))
                            <media:copyright>{{ $item->extra['image_copyright'] }}</media:copyright>
                        @endif
                    </media:content>

                    <!-- Image en enclosure (alternative) -->
                    <enclosure
                        url="{{ $item->extra['image_url'] }}"
                        type="image/jpeg"
                        length="0" />
                @endif

                <!-- MÉTADONNÉES DUBLIN CORE (optionnel) -->
                <dc:date>{{ $item->updated->toAtomString() }}</dc:date>
                <dc:type>Text</dc:type>
                <dc:format>text/html</dc:format>
                <dc:language>fr</dc:language>
                <dc:rights>Copyright {{ date('Y') }} {{ config('app.name') }}</dc:rights>

                <!-- SOURCE (si republication) -->
                @if(isset($item->extra['source_url']) && $item->extra['source_url'])
                    <source url="{{ $item->extra['source_url'] }}">{{ $item->extra['source_name'] ?? 'Source originale' }}</source>
                @endif

                <!-- COMMENTAIRES (si disponibles) -->
                @if(isset($item->extra['comments_url']) && $item->extra['comments_url'])
                    <comments>{{ $item->extra['comments_url'] }}</comments>
                @endif
            </item>
        @endforeach
    </channel>
</rss>
