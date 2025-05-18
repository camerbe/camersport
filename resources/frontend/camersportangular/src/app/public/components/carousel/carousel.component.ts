import { Component, inject, Input, OnInit } from '@angular/core';
import { ArticleDetail } from '../../../core/models/article-detail';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../core/models/article';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit{

  articleService:ArticleService= inject(ArticleService);
  @Input() carouselItems: ArticleDetail[] = [];
  articles: ArticleDetail[] = [];



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


}
