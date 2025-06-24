import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Rss } from '../../../core/models/rss';
import { RssService } from '../../../services/rss.service';
import { isPlatformBrowser } from '@angular/common';
import { RssDetail } from '../../../core/models/rss-detail';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrl: './rss.component.css'
})
export class RssComponent implements OnInit{
  isBrowser!: boolean;
  rssList: RssDetail[] = [];
  /**
   *
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private rssService: RssService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }
  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.rssService.getCamerRss().subscribe({
      next: (data) => {
        const tempData=data as unknown as Rss;
        this.rssList=tempData["data"] as unknown as RssDetail[];
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des flux RSS:', error);
      }
    });
  }

}
