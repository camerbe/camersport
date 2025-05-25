import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-viralize',
  templateUrl: './viralize.component.html',
  styleUrl: './viralize.component.css'
})
export class ViralizeComponent implements AfterViewInit {

  @Input() zId!: string;
  @ViewChild('adContainer', { static: true }) adContainer!: ElementRef<HTMLDivElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)){
      const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.injectViralizeScript();
          obs.unobserve(this.adContainer.nativeElement);
        }
      });
    });
    observer.observe(this.adContainer.nativeElement);
    }

  }
  injectViralizeScript() {
    const script = document.createElement('script');
    script.src =`https://content.viralize.tv/display/?zid=${this.zId}`;
    script.type = 'text/javascript';
    script.setAttribute('data-wid', 'auto');
    script.async = true;
    this.adContainer.nativeElement.appendChild(script);
  }

}
