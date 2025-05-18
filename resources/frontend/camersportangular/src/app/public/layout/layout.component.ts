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

  articleService: ArticleService = inject(ArticleService);
  articleItemsService:ArticleItemsService=inject(ArticleItemsService);
  route:ActivatedRoute=inject(ActivatedRoute);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
    }
  }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
    }
    this.articleItemsService.updateState(this.route.snapshot.data['articleItems']);
    //this.articleItems.state$.subscribe((data) => {;
    // this.articleService.publicIndex()
    //   .subscribe({
    //     next:(data)=>{
    //       const tempData=data as unknown as Article;
    //       this.articles=tempData["data"] as unknown as ArticleDetail[];
    //       this.slicedNews=this.articles.slice(3, 12);
    //     },
    //     error:(error)=>console.log(error)
    //   })

  }
}
