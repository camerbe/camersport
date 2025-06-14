import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 6001,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

window.Echo.channel('livematchs')
    // Pour les événements BroadcastsEvents (ce que vous utilisez actuellement)
    .listen('eloquent.created: App\\Models\\Livematch', (e) => {
        console.log('🆕 Livematch created:', e);
        console.log('Data:', e.model);
    })
    .listen('eloquent.updated: App\\Models\\Livematch', (e) => {
        console.log('🔄 Livematch updated:', e);
        console.log('Data:', e.model);
        // Ici vous pouvez mettre à jour votre interface
        //updateLivematchInUI(e.model);
    })
    .listen('eloquent.deleted: App\\Models\\Livematch', (e) => {
        console.log('🗑️ Livematch deleted:', e);
    })
    // Écoutez aussi l'événement personnalisé au cas où
    .listen('LivematchUpdated', (e) => {
        console.log('🎯 Custom LivematchUpdated:', e);
    })
    // Écoutez TOUS les événements pour déboguer
    .listenToAll((eventName, data) => {
        console.log('🎪 Événement reçu:', eventName, data);
    });
