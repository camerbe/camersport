import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaboolaService {

  private scriptLoaded = false;
  /**
   *
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  loadScript(): void {
    if (isPlatformBrowser(this.platformId)){
      if (!this.scriptLoaded) {
        const script = document.createElement('script');
        script.async = true;
        script.src = '//cdn.taboola.com/libtrc/camerbelgique/loader.js';
        document.head.appendChild(script);
        this.scriptLoaded = true;
      }
    }

  }
}
