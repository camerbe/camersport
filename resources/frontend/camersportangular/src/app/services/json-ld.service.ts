import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class JsonLdService {

  meta:Meta=inject(Meta);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc: Document
  ) { }

  setJsonLd(data: any){
    if (isPlatformBrowser(this.platformId)){
      const json = JSON.stringify(data);
      let script = this.doc.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = this.doc.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        this.doc.head.appendChild(script);
      }
       script.textContent = json;
    }
    else{
      const json = JSON.stringify(data);
      this.meta.addTag({ name: 'json-ld', content: json });
    }
  }
}
