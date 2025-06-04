import { ArticleDetail } from './../../core/models/article-detail';
import { JsonLdService } from './../../services/json-ld.service';
import { ArticleService } from './../../services/article.service';
import { Component, Inject, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { HashtagExtractorService } from '../../services/hashtag-extractor.service';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../../services/canonical.service';
import { ArticleItemsService } from '../../services/article-items.service';
import { isPlatformBrowser } from '@angular/common';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  //@Input() news:ArticleDetail[]=[];
  articles:ArticleDetail[]=[];
  article!:ArticleDetail;
  otherNews:ArticleDetail[]=[];
  news:ArticleDetail[]=[];
  mostReadedCats:ArticleDetail[]=[];
  slicedArticles:ArticleDetail[]=[];
  jsonLdArticles:ArticleDetail[]=[];
  jsonldArticle: any[] = [];
  randomNumber!: number;
  articlesPerPage = 5;
  currentPage = 0;
  pagedArticles: ArticleDetail[] = [];

  /**
   *
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  //articleService:ArticleService=inject(ArticleService)
  route:ActivatedRoute=inject(ActivatedRoute);
  router:Router=inject(Router);
  jsonLdService:JsonLdService=inject(JsonLdService);
  hashtagExtractorService:HashtagExtractorService=inject(HashtagExtractorService);
  metaService:Meta=inject(Meta);
  titleService:Title=inject(Title);
  canonicalService:CanonicalService=inject(CanonicalService);
  articleItemsService:ArticleItemsService=inject(ArticleItemsService);

  ngOnInit(): void {
    this.randomNumber = Math.floor(Math.random() * 1000001) / 1000000;
    this.articleItemsService.updateState(this.route.snapshot.data['articleItems']);
  if (isPlatformBrowser(this.platformId)){
    this.articleItemsService.state$.subscribe({
          next:(data:ArticleDetail[])=>{
            this.articles=data;
            this.news=data.slice(0, 25).filter((item:ArticleDetail) => item.pays_code === "CMR");
            this.otherNews=data.slice(0, 25).filter((item:ArticleDetail) => item.pays_code !== "CMR");
            //console.log(this.otherNews);
            this.slicedArticles=data.slice(0, 10);
            //console.log(this.slicedArticles)
            this.jsonLdArticles=data.slice(0, 20);
            this.article = this.jsonLdArticles[0];
            //console.log(this.article);
          },
          error:(error)=>console.log(error)
        });
      this.canonicalService.updateCanonicalUrl(this.router.url);

          this.metaService.updateTag({ name: 'description', content: this.article.chapeau });
          this.metaService.updateTag({ name: 'keywords', content: this.article.motclef });
          this.metaService.updateTag({ name: 'title', content: this.article.titre });
          this.metaService.updateTag({ name: 'og:title', content: this.article.titre });
          this.metaService.updateTag({ name: 'og:description', content: this.article.chapeau });
          this.metaService.updateTag({ name: 'og:image', content: this.article.images[0].url });
          this.metaService.updateTag({ name: 'og:url', content: this.router.url });
          this.metaService.updateTag({ name: 'og:type', content: 'article' });
          this.metaService.updateTag({ name: 'og:locale', content: 'fr_FR' });
          this.metaService.updateTag({ name: 'og:locale:alternate', content: 'en-us' });
          this.metaService.updateTag({ name: 'og:site_name', content: 'Camer-sport.com' });
          this.metaService.updateTag({ name: 'twitter:title', content: this.article.titre });
          this.metaService.updateTag({ name: 'twitter:description', content: this.article.chapeau });
          this.metaService.updateTag({ name: 'twitter:image', content: this.article.images[0].url });
          this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.metaService.updateTag({ name: 'twitter:site', content: '@camer.be' });
          this.metaService.updateTag({ name: 'twitter:creator', content: '@camersport' });
          this.metaService.updateTag({ name: 'twitter:url', content: this.router.url });
          this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
          //this.metaService.updateTag({ name: 'canonical', content: this.router.url });
          this.metaService.updateTag({ name: 'article:modified_time', content: new Date(Date.now()).toISOString().slice(0, 19) + '+00:00' });
          this.metaService.updateTag({ name: 'article:published_time', content: new Date(this.article.date_parution).toISOString().slice(0, 19) + '+00:00' });

          this.metaService.updateTag({ name: 'article:section', content: this.article.categorie.categorie });

          this.metaService.updateTag({ name: 'article:tag', content: this.hashtagExtractorService.extractHashtags(this.article.motclef)   });
          this.metaService.updateTag({ name: 'article:author', content: this.article.auteur });
          this.metaService.updateTag({ name: 'article:publisher', content: 'camer-sport.com' });
          this.titleService.setTitle(`Camer-sport.com : Football Camerounais et International,Cameroon Football News, Cameroon Football, Cameroon Sports News, Cameroon Sports`);
  }

    // this.news=this.articles.slice(3, 12);
    // this.slicedArticles=this.articles.slice(0, 3);
    // this.jsonLdArticles=this.articles.slice(0, 20);
    // this.article = this.jsonLdArticles[0];


    if (isPlatformBrowser(this.platformId)){
      this.jsonLdArticles.forEach((article) => {
      const date =new Date(Date.now());
      const today=date.toISOString().slice(0, 19) + '+00:00'
      const articleDate = new Date(article.date_parution).toISOString().slice(0, 19) + '+00:00';
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "url": `${window.location.protocol}//${window.location.host}${this.router.url}`,
        "publisher": {
          "@type": "Organization",
          "name": "Camer-Sport",
          "logo": `${window.location.protocol}//${window.location.host}/assets/camersport.png`,
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${window.location.protocol}//${window.location.host}${this.router.url}`
        },
        "headline": article.titre,
        "image": {
          "@type": "ImageObject",
          "url": article.images[0].url,
          "width": 500,
          "height": 500
        },
        "datePublished": articleDate,
        "dateModified": today,
        "author": {
          "@type": "Person",
          "name": article.auteur
        },
        "description": article.chapeau,
        "articleSection": article.categorie.categorie,
        "articleBody": article.article,
        "keywords": this.hashtagExtractorService.removeHashtags(article.motclef),
        "inLanguage": "fr",
        "articleTag": this.hashtagExtractorService.extractHashtags(article.motclef),
      };
      this.jsonldArticle.push(jsonLd);
    });
    }

    this.jsonLdService.setJsonLd(this.jsonldArticle);
  }

  updatePagedArticles() {
        const start = this.currentPage * this.articlesPerPage;
        const end = start + this.articlesPerPage;
        this.pagedArticles = this.articles.slice(start, end);
      }

      onPageChange($event: PaginatorState) {
        this.currentPage = ($event.page ?? 0) | 0; // Ensure currentPage is always a number
        this.articlesPerPage = $event.rows || 10; // Default to 10 if rows is undefined
        this.updatePagedArticles();
      }

}
