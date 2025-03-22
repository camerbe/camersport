<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Carbon;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\URL;

class VerifyApiEmail extends VerifyEmail
{
    //use Queueable;

    protected function verificationUrl($notifiable)
    {
        return URL::temporarySignedRoute(
            'verify',
            Carbon::now()->addMinute(60),
            [
                'id'=>$notifiable->getKey()
            ]
        ); // TODO: Change the autogenerated stub
    }




    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable): MailMessage
    {
        return parent::toMail($notifiable); // TODO: Change the autogenerated stub
    }
    public static function toMailUsing($callback)
    {
        dd('toMailUsing');
        //parent::toMailUsing($callback); // TODO: Change the autogenerated stub
        return (new MailMessage)
            ->subject("Confirmation d'adresse e-mail")
            ->line('Cliquez sur le bouton ci-dessous pour vérifier votre adresse e-mail')
            ->action("Vérifier l'adresse e-mail");
    }

}
