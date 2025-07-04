import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../core/models/article';
import { ArticleDetail } from '../../core/models/article-detail';
import { ArticleItemsService } from '../../services/article-items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  isMobile!: boolean;
  carouselItems: any[] = [];
  articles:ArticleDetail[]=[];
  slicedNews:ArticleDetail[]=[];
  randomNumber: number = 0;
  currentYear: number = new Date().getFullYear();
  loadAds!:boolean;
  isBrowser!: boolean;

  // articleService: ArticleService = inject(ArticleService);
  // articleItemsService:ArticleItemsService=inject(ArticleItemsService);
  // route:ActivatedRoute=inject(ActivatedRoute);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private articleService: ArticleService,
    private articleItemsService: ArticleItemsService,
    private route: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.isMobile = window.innerWidth < 768;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if(!this.isBrowser) return;
    //if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
    //}
  }


  ngOnInit(): void {
    if (!this.isBrowser) return;
    setTimeout(() => {
      this.loadAds = true;
    }, 1000);
    //if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      this.randomNumber = Math.floor(Math.random() * 1000001) / 1000000;
    //}
    this.articleItemsService.updateState(this.route.snapshot.data['articleItems']);



  }
}
