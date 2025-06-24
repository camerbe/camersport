<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecureHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('Content-Security-Policy', "frame-ancestors 'self';");

        // Empêche l'interprétation MIME
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Protection contre le XSS (obsolète mais parfois utile pour IE)
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // Referrer plus strict pour la vie privée
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Politique de permissions (remplace Feature-Policy)
        $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
        return $next($request);
    }
}
