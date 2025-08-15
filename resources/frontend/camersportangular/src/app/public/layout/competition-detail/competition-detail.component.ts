import { afterNextRender, Component, ElementRef, Inject, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ArticleDetail } from '../../../core/models/article-detail';
import { ArticleItemsService } from '../../../services/article-items.service';
import { JsonLdService } from '../../../services/json-ld.service';
import { HashtagExtractorService } from '../../../services/hashtag-extractor.service';
import { disableDebugTools, Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../../../services/canonical.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PaginatorState } from 'primeng/paginator';
import slugify from 'slugify';

@Component({
  selector: 'app-competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrl: './competition-detail.component.css'
})
export class CompetitionDetailComponent implements OnInit {
  @ViewChild('competition') compet!: ElementRef;
  randomNumber!: number;
  articles:ArticleDetail[]=[];
  labelCompetition!:string;
  otherNews:ArticleDetail[]=[];

  articlesPerPage = 10;
  currentPage = 0;
  pagedArticles: ArticleDetail[] = [];
  jsonLdArticles:ArticleDetail[]=[];
  jsonldArticle: any[] = [];
  article!:ArticleDetail;
  slug!:string;
  isBrowser!: boolean;
  competitionLabel: string = '';
  slugCategorie: string = slugify('Lions Indomptables', { lower: true, strict: true });
  isCategory: boolean = false;
    constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      private articleItemService: ArticleItemsService,
      private jsonLdService: JsonLdService,
      private hashtagExtractorService: HashtagExtractorService,
      private metaService: Meta,
      private titleService: Title,
      private canonicalService: CanonicalService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
      if (this.isBrowser) {
        this.randomNumber = Math.floor(Math.random() * 1000001) / 1000000;
      }
      afterNextRender(() => {
        //console.log('Route data:', this.route.snapshot.data['articleItems']);
        // Update the state of articleItemsService with the data from the route
      });
      //this.articles=this.route.snapshot.data['articleItems'] ;

    }
    ngOnInit(): void {
      //console.log('Route data:', this.route.snapshot.data['articleItems']);

      const resolvedArticles = this.route.snapshot.data['articleItems'];
      if (!resolvedArticles) return
      this.articleItemService.updateState(resolvedArticles);
      if (!this.isBrowser) return;
      this.slug=this.route.snapshot.params['competition'];
      this.isCategory = this.slugCategorie === this.slug;

      if (isPlatformBrowser(this.platformId)){
         if( this.articles.length === 0 || this.articles === undefined || this.articles === null){

          this.updatePagedArticles();
          this.articleItemService.state$.subscribe({
            next: (data: ArticleDetail[]) => {
              //console.log('Data received from articleItemsService:', data);
              if (Array.isArray(data)) {
                if (this.isCategory) {
                  this.articles = data.filter(item => item.categorie.slugcategorie === this.slugCategorie).slice(0, 100);
                  this.competitionLabel = this.articles[0]?.categorie?.categorie;
                }
                else{
                  this.articles = data.filter(item => item.competition.slugcompetition === this.slug).slice(0, 100);
                  this.competitionLabel = this.articles[0]?.competition?.competition;
                }
                this.otherNews=data.slice(0, 25).filter((item:ArticleDetail) => item.pays_code !== "CMR");
                this.jsonLdArticles = this.articles.slice(0, 20);
                this.article = this.jsonLdArticles[0];



              } else {
                this.articles = [];
                //this.router.navigate(['/accueil'])
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
          if( this.article) {
          this.canonicalService.updateCanonicalUrl(this.router.url);
          const imageUrl = this.article?.images?.url || 'https://placehold.co/400';

          this.metaService.updateTag({ name: 'description', content: this.article.chapeau });
          this.metaService.updateTag({ name: 'keywords', content: this.article.motclef });
          this.metaService.updateTag({ name: 'title', content: this.article.titre });
          this.metaService.updateTag({ name: 'og:title', content: this.article.titre });
          this.metaService.updateTag({ name: 'og:description', content: this.article.chapeau });
          this.metaService.updateTag({ name: 'og:image', content: imageUrl });
          this.metaService.updateTag({ name: 'og:image:width', content: this.article.images.width });
          this.metaService.updateTag({ name: 'og:image:height', content: this.article.images.height });
          this.metaService.updateTag({ name: 'og:image:alt', content: this.article.titre });
          this.metaService.updateTag({ name: 'og:url', content: `${window.location.protocol}//${window.location.host}${this.router.url}` });
          this.metaService.updateTag({ name: 'og:type', content: 'article' });
          this.metaService.updateTag({ name: 'og:locale', content: 'fr_FR' });
          this.metaService.updateTag({ name: 'og:locale:alternate', content: 'en-us' });
          this.metaService.updateTag({ name: 'og:site_name', content: 'Camer-sport.com' });
          this.metaService.updateTag({ name: 'twitter:title', content:  this.article.titre.slice(0, 70) + '...'   });
          this.metaService.updateTag({ name: 'twitter:description', content: this.article.chapeau });
          this.metaService.updateTag({ name: 'twitter:image', content: imageUrl  });
          this.metaService.updateTag({ name: 'twitter:image:alt', content: this.article.titre  });
          this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.metaService.updateTag({ name: 'twitter:site', content: '@camer.be' });
          this.metaService.updateTag({ name: 'twitter:creator', content: '@camersport' });
          this.metaService.updateTag({ name: 'twitter:url', content: `${window.location.protocol}//${window.location.host}${this.router.url}` });
          this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
          //this.metaService.updateTag({ name: 'canonical', content: this.router.url });
          this.metaService.updateTag({ name: 'article:modified_time', content: new Date(Date.now()).toISOString().slice(0, 19) + '+00:00' });
          this.metaService.updateTag({ name: 'article:published_time', content: new Date(this.article.date_parution).toISOString().slice(0, 19) + '+00:00' });

          this.metaService.updateTag({ name: 'article:section', content: this.article.categorie.categorie });

          this.metaService.updateTag({ name: 'article:tag', content: this.hashtagExtractorService.extractHashtags(this.article.motclef)   });
          this.metaService.updateTag({ name: 'article:author', content: this.article.auteur });
          this.metaService.updateTag({ name: 'article:publisher', content: 'camer-sport.com' });
          this.titleService.setTitle(`Camer-sport.com : Football Camerounais ${this.article.categorie.categorie} ${this.article.competition.competition}`);
          /*****************************************************
           *
           */
          //console.log(this.jsonLdArticles)
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
              "width": this.article.images.width,
              "height": this.article.images.height
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
        }

      }


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
