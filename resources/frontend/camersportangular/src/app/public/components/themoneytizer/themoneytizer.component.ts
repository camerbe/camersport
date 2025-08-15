import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, inject, Input, OnDestroy, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-themoneytizer',
  templateUrl: './themoneytizer.component.html',
  styleUrl: './themoneytizer.component.css'
})
export class ThemoneytizerComponent implements AfterViewInit, OnDestroy {

  @Input() adId!: string;
  @Input() formatId!: string;
  @Input() typeId!: string;
  @Input() siteId = '9307';

  @ViewChild('adContainer', { static: true }) adContainer!: ElementRef<HTMLDivElement>;

  //renderer: Renderer2= inject(Renderer2);
 // el: ElementRef= inject(ElementRef);
  //observer!: IntersectionObserver;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnDestroy(): void {
    //this.scripts.forEach(script => script.remove());
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)){
      //const container = this.el.nativeElement.querySelector(`#${this.adId}`);
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadScript(`//ads.themoneytizer.com/s/gen.js?type=${this.typeId}`);
            this.loadScript(`//ads.themoneytizer.com/s/requestform.js?siteId=${this.siteId}&formatId=${this.formatId}` );
            obs.unobserve(this.adContainer.nativeElement);
          }
        });
    });
    observer.observe(this.adContainer.nativeElement);
    }
  }

  private loadScript(src: string): void {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }

}
