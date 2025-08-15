<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <title>{{ $title }} </title>

    <meta name="description" content="{{ $description }}" />
    <meta property="og:title" content="{{ $titre }}" />
    <meta property="og:description" content="{{ $description }}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="{{ $url }}" />
    <meta property="og:image" content="{{ $image }}" />
    <meta property="article:published_time" content="{{ $date }}" />
    <meta property="article:author" content="{{ $auteur }}" />

    <!-- Twitter cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{ $titre }}" />
    <meta name="twitter:description" content="{{ $description }}" />
    <meta name="twitter:image" content="{{ $image }}" />

    <!-- Autres metas selon besoin -->

</head>
<body>
<h1>{{ $titre }}</h1>
<p>Chargement de la page…</p>
<script src="/path-to-your-angular-bundle.js" defer></script>
</body>
</html>
