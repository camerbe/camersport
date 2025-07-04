import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CanonicalService {

  //renderer: Renderer2 = inject(Renderer2);
  canonicalLink: HTMLLinkElement | null = null;
  //rendererFactory: RendererFactory2 = inject(RendererFactory2);
  //router: Router = inject(Router);
  constructor(
    private rendererFactory: RendererFactory2,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {

    this.createCanonicalLink();
  }

  private createCanonicalLink(): void {
    this.canonicalLink = this.document.querySelector('link[rel="canonical"]');
    if (isPlatformBrowser(this.platformId)){
      if (!this.canonicalLink) {
      const renderer = this.rendererFactory.createRenderer(null, null);
      this.canonicalLink = renderer.createElement('link');
      renderer.setAttribute(this.canonicalLink, 'rel', 'canonical');
      renderer.appendChild(this.document.head, this.canonicalLink);
      }
    }


  }
  updateCanonicalUrl(url: string): void {
    if (!this.canonicalLink) return;
     if (isPlatformBrowser(this.platformId)){
      const canonicalUrl = `${window.location.protocol}//${window.location.host}${url}`;
      this.canonicalLink.setAttribute('href', canonicalUrl);
     }

  }

}
