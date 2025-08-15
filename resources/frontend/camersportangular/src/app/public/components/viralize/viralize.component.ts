import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-viralize',
  templateUrl: './viralize.component.html',
  styleUrl: './viralize.component.css'
})
export class ViralizeComponent implements AfterViewInit {

  @Input() zId!: string;
  @ViewChild('adContainer', { static: true }) adContainer!: ElementRef<HTMLDivElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer:Renderer2
  ) {}


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
    //script.src =`https://content.viralize.tv/display/?zid=${this.zId}`;
    script.src =`https://ads.viralize.tv/display/?zid=${this.zId}`;
    script.type = 'text/javascript';
    script.setAttribute('data-wid', 'auto');
    script.async = true;
    //this.adContainer.nativeElement.appendChild(script);
    this.renderer.appendChild(document.body, script);


    // const script = this.renderer.createElement('script');
    // script.src = 'https://ads.viralize.tv/display/?zid=AADZ3InnB0waF_lc';
    // script.type = 'text/javascript';
    // script.setAttribute('data-wid', 'auto');
    // this.renderer.appendChild(document.body, script);
  }

}
