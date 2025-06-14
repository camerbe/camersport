import { AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ArticleDetail } from '../../../core/models/article-detail';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../core/models/article';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit,AfterViewInit{
  @ViewChild('carouselRef') carousel: Carousel | undefined;
  articleService:ArticleService= inject(ArticleService);

  @Input() carouselItems: ArticleDetail[] = [];
  articles: ArticleDetail[] = [];
  selectedImageUrl!: string;
  displayImagePreview!: boolean;

  ngAfterViewInit(): void {
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

