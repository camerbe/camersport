import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EchoService {
  public echoReady$ = new ReplaySubject<Echo<any>>(1);
  private echo!: Echo<any>;

  private initEcho(): void{
    (window as any).Pusher = Pusher;

    this.echo=new Echo({
      broadcaster: 'reverb',
      key: 'i7nzgaltuwl2ffvmy6d1',
      wsHost: 'localhost',
      wsPort: 6001,
      forceTLS: false,
      enabledTransports: ['ws'],
    });


    this.echoReady$.next(this.echo);
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)){
      this.initEcho();
    }

  }

  subscribeToLivematchs(callback: (event: any) => void): void {
  this.echoReady$.subscribe(echo => {
    echo.channel('livematchs')
      .listen('.eloquent.created: App.Models.Livematch', callback)
      .listen('.eloquent.updated: App.Models.Livematch', callback)
      .listen('.eloquent.deleted: App.Models.Livematch', callback);
  });
  }
  leaveChannel(){
    if (this.echo) {
      this.echo.leave('livematchs');
    }

  }
}
