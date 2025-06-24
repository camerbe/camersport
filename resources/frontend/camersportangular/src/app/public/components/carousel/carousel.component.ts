import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ArticleDetail } from '../../../core/models/article-detail';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../core/models/article';
import { Carousel } from 'primeng/carousel';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit,AfterViewInit{
  @ViewChild('carouselRef') carousel: Carousel | undefined;
  isBrowser!: boolean;
  // articleService:ArticleService= inject(ArticleService);

  /**
   *
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private articleService: ArticleService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @Input() carouselItems: ArticleDetail[] = [];
  articles: ArticleDetail[] = [];
  selectedImageUrl!: string;
  displayImagePreview!: boolean;

  ngAfterViewInit(): void {
    if (!this.isBrowser || !this.carousel) return;
    setTimeout(() => {
      // Type assertion to access internal API
      const carouselAny = this.carousel as any;
      if (carouselAny && typeof carouselAny.update === 'function') {
        carouselAny.update();
      }
    }, 0);

  }


  ngOnInit(): void {
    // this.articleService.publicIndex()
    // .subscribe({
      //   next:(data) =>{
        //     const tempData=data as unknown as Article;
        //     this.articles=tempData["data"] as unknown as ArticleDetail[];
        //     this.carouselItems=this.articles.slice(0, 3);
        //     //console.log(this.carouselItems);
        //   }
        //   ,error:(error)=>console.log(error)
    // });

  }

  openImagePreview(imageUrl: any) {
    if (imageUrl) {
      this.selectedImageUrl = imageUrl;
      this.displayImagePreview = true;
    }
  }

}

