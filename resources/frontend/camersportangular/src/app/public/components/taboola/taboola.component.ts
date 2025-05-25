import { AfterViewInit, Component, ElementRef, Inject, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { TaboolaService } from '../../../services/taboola.service';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-taboola',
  templateUrl: './taboola.component.html',
  styleUrl: './taboola.component.css'
})
export class TaboolaComponent implements AfterViewInit {

  @ViewChild('taboolaContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;


  taboolaService: TaboolaService = inject(TaboolaService);
  sanitizer: DomSanitizer = inject(DomSanitizer);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)){
      const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadTaboola();
          obs.unobserve(this.containerRef.nativeElement);
        }
      });
     });

      observer.observe(this.containerRef.nativeElement);
    }


  }
  loadTaboola() {
    (window as any)._taboola = (window as any)._taboola || [];
    (window as any)._taboola.push({ article: 'auto' });

    if (!document.getElementById('tb_loader_script')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = '//cdn.taboola.com/libtrc/camerbelgique/loader.js';
      script.id = 'tb_loader_script';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode!.insertBefore(script, firstScript);
    }

    if (window.performance && typeof window.performance.mark === 'function') {
      window.performance.mark('tbl_ic');
    }
  }


}
