import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ArticleItemsService } from '../../../services/article-items.service';
import { ArticleDetail } from '../../../core/models/article-detail';
import { ActivatedRoute, Route, Router } from '@angular/router';
import slugify from 'slugify';
import { isPlatformBrowser } from '@angular/common';
import { PaginatorState } from 'primeng/paginator';
import { JsonLdService } from '../../../services/json-ld.service';
import { HashtagExtractorService } from '../../../services/hashtag-extractor.service';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../../../services/canonical.service';

@Component({
  selector: 'app-lions-indomptables',
  templateUrl: './lions-indomptables.component.html',
  styleUrl: './lions-indomptables.component.css'
})
export class LionsIndomptablesComponent implements OnInit {


  // articleItemService:ArticleItemsService=inject(ArticleItemsService);
  // jsonLdService:JsonLdService=inject(JsonLdService);
  // hashtagExtractorService:HashtagExtractorService=inject(HashtagExtractorService);
  // metaService:Meta=inject(Meta);
  // titleService:Title=inject(Title);
  // canonicalService:CanonicalService=inject(CanonicalService);
  // articleItemsService:ArticleItemsService=inject(ArticleItemsService);
  // router:Router = inject(Router);
  // route:ActivatedRoute = inject(ActivatedRoute);
  articles:ArticleDetail[] = [];
  slugCategorie: string = slugify('Lions Indomptables', { lower: true, strict: true });
  articlesPerPage = 10;
  currentPage = 0;
  pagedArticles: ArticleDetail[] = [];
  jsonLdArticles:ArticleDetail[]=[];
  jsonldArticle: any[] = [];
  article!:ArticleDetail;
  isBrowser!: boolean;
  // isMobile: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private articleItemService: ArticleItemsService,
    private jsonLdService: JsonLdService,
    private hashtagExtractorService: HashtagExtractorService,
    private metaService: Meta,
    private titleService: Title,
    private canonicalService: CanonicalService,
    private router: Router,
    private route: ActivatedRoute,
    private articleItemsService: ArticleItemsService,
    private articleService: ArticleItemsService

  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    //this.articleItemService.updateState(this.route.snapshot.data['articleItems']);
    if(!this.isBrowser) return;
    //if (isPlatformBrowser(this.platformId)){
    //console.log(this.articles);
      if( this.articles.length === 0 || this.articles === undefined || this.articles === null) {
        this.updatePagedArticles();
        this.articleItemService.state$.subscribe({
          next: (data: ArticleDetail[]) => {
            if (Array.isArray(data)) {
              this.articles = data.filter(item => item.categorie.slugcategorie === this.slugCategorie).slice(0, 100);
              this.jsonLdArticles= data.filter(item => item.categorie.slugcategorie === this.slugCategorie).slice(0, 20);
              this.article = this.jsonLdArticles[0];
            } else {
              this.articles = [];
            }
          },
          error: (error) => {
            console.error('Error fetching articles:', error);
            this.articles = [];
          }
        });
        /********************************************************
         * ****************************************************
         */
        this.canonicalService.updateCanonicalUrl(this.router.url);
        if(this.article){
          this.metaService.updateTag({ name: 'description', content: this.article.chapeau });
          this.metaService.updateTag({ name: 'keywords', content: this.article.motclef });
          this.metaService.updateTag({ name: 'title', content: this.article.titre });
          this.metaService.updateTag({ name: 'og:title', content: this.article.titre });
          this.metaService.updateTag({ name: 'og:description', content: this.article.chapeau });
          this.metaService.updateTag({ name: 'og:image', content: this.article.images.url });
          this.metaService.updateTag({ name: 'og:url', content: this.router.url });
          this.metaService.updateTag({ name: 'og:type', content: 'article' });
          this.metaService.updateTag({ name: 'og:locale', content: 'fr_FR' });
          this.metaService.updateTag({ name: 'og:locale:alternate', content: 'en-us' });
          this.metaService.updateTag({ name: 'og:site_name', content: 'Camer-sport.com' });
          this.metaService.updateTag({ name: 'twitter:title', content: this.article.titre });
          this.metaService.updateTag({ name: 'twitter:description', content: this.article.chapeau });
          this.metaService.updateTag({ name: 'twitter:image', content: this.article.images.url });
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
          this.titleService.setTitle(`Camer-sport.com : Football Camerounais ${this.article.categorie.categorie}`);
        }

        /*****************************************************
         *
         */
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
            "url": article.images.url,
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
        this.jsonLdService.setJsonLd(this.jsonldArticle);
      }
      else{
        // this.articles = this.route.snapshot.data['articleItems'].filter((item: ArticleDetail) => item.categorie.slugcategorie === this.slugCategorie).slice(0, 100);
        //console.log('Articles already loaded:', this.articles);

      }

    //}

    //console.log(items.length);
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
