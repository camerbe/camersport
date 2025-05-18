import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, inject, Input, OnDestroy, PLATFORM_ID, Renderer2 } from '@angular/core';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.css'
})
export class AdsComponent implements AfterViewInit {

  @Input() adClient!: string;
  @Input() adSlot!: string;
  @Input() adFormat: string= 'auto';
  @Input() adStyle: { [key: string]: string } = {
    display: 'block',
  };
  @Input() fullWidthResponsive = 'true';

  el:ElementRef=inject(ElementRef);
  renderer:Renderer2=inject(Renderer2);
  //insElement: HTMLModElement=inject(HTMLModElement);

  constructor( @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!window.adsbygoogle) {
        window.adsbygoogle = [];
      }
    }

    const ins = this.renderer.createElement('ins');
    this.renderer.addClass(ins, 'adsbygoogle');

    Object.keys(this.adStyle).forEach(key => {
      this.renderer.setStyle(ins, key, this.adStyle[key]);
    });

    this.renderer.setAttribute(ins, 'data-ad-client', this.adClient);
    this.renderer.setAttribute(ins, 'data-ad-slot', this.adSlot);
    this.renderer.setAttribute(ins, 'data-ad-format', this.adFormat);
    this.renderer.setAttribute(ins, 'data-full-width-responsive', this.fullWidthResponsive);

    this.renderer.appendChild(this.el.nativeElement, ins);

    try {
      if (isPlatformBrowser(this.platformId)){
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }

    } catch (e) {
      console.error('AdSense initialization error:', e);
    }
  }

  ngOnInit(): void {
    // Initialize Google Ads
    //(window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  // ngOnDestroy(): void {
  //   if (this.insElement) {
  //     this.renderer.removeChild(this.el.nativeElement, this.insElement);
  //   }
  // }
}
