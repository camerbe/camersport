import { AfterViewInit, Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ArticleDetail } from '../../../core/models/article-detail';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Article } from '../../../core/models/article';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { JsonLdService } from '../../../services/json-ld.service';
import { HashtagExtractorService } from '../../../services/hashtag-extractor.service';
import { CanonicalService } from '../../../services/canonical.service';
import { filter } from 'rxjs';
import { ArticleItemsService } from '../../../services/article-items.service';
import { ArticleService } from '../../../services/article.service';
import slugify from 'slugify';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit,AfterViewInit  {

  @ViewChild('competition', { static: false }) compet!: ElementRef;
  slugCompetition!: string ;
  constructor() {
    this.articles=this.route.snapshot.data['articleItems'] ;
  }
  ngAfterViewInit(): void {
    if (this.compet?.nativeElement?.getAttribute){
      this.slugCompetition=slugify(this.compet.nativeElement.getAttribute('aria-label'), { lower: true, strict: true })
      const label = this.compet.nativeElement.getAttribute('aria-label');
    }
    else{
      console.warn('compétition non initialisée');
    }

    //console.log('ARIA label (Renderer2):', label);
  }

  renderer: Renderer2=inject(Renderer2);
  route:ActivatedRoute= inject(ActivatedRoute);
  router:Router= inject(Router);
  sanitizer:DomSanitizer= inject(DomSanitizer);
  metaService:Meta= inject(Meta);
  titleService:Title= inject(Title);
  jldService:JsonLdService= inject(JsonLdService);
  hashtagExtractorService:HashtagExtractorService=inject(HashtagExtractorService);
  canonicalService: CanonicalService= inject(CanonicalService);
  articleItemsService: ArticleItemsService = inject(ArticleItemsService);
  articleService: ArticleService = inject(ArticleService);

  article!: ArticleDetail;
  articles:ArticleDetail[]=[];
  filteredArticles: ArticleDetail[] = [];
  news: any[] = [];
  categorieMustReaded: ArticleDetail[] = [];
  competitionMustReaded: ArticleDetail[] = [];
  isMobile: boolean = false;

  ngOnInit(): void {
    let currentArticle = this.route.snapshot.data['slug'] ;
    //console.log(currentArticle);
    this.articleItemsService.state$.subscribe({
      next:(data:ArticleDetail[])=>{
        if (!Array.isArray(data)) {
          this.filteredArticles = [];
          return;
        }
        this.article =currentArticle['data'] as ArticleDetail;

        if (this.article) {
          this.filteredArticles = data.filter(item =>
            (item.competition_id === this.article.competition.id) && (item.id !== this.article?.id)
          ).slice(0, 10);
          //console.log('Filtered:', this.filteredArticles);
        }
        this.articleService.categorieMustReaded(this.article.categorie.id)
    .subscribe({
      next:(data) =>{
        const tempData=data as unknown as Article;
        this.categorieMustReaded=tempData["data"] as unknown as ArticleDetail[];
        //console.log(this.categorieMustReaded);
      }
      ,error:(error)=>console.log(error)
    });
      this.articleService.competitionMustReaded(this.article.competition.id)
      .subscribe({
        next:(data) =>{
          const tempData=data as unknown as Article;
          this.competitionMustReaded=tempData["data"] as unknown as ArticleDetail[];
          //console.log(this.competitionMustReaded);
        }
        ,error:(error)=>console.log(error)
      });
    },
      error:(error)=>console.log(error)
    });
    if (this.article == null) {
      this.router.navigate(['/accueil']);
    }


    this.canonicalService.updateCanonicalUrl(this.router.url);


    //console.log('Article:', this.article);
    const date =new Date(Date.now());
    const today=date.toISOString().slice(0, 19) + '+00:00'
    const articleDate = new Date(this.article.date_parution).toISOString().slice(0, 19) + '+00:00';
    const pays = this.article.pays.pays;

    const title = this.article.categorie.categorie+' :: '+ this.appendCountryIfFound(this.article.titre, pays);

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
    this.metaService.updateTag({ name: 'article:modified_time', content: today });
    this.metaService.updateTag({ name: 'article:published_time', content: articleDate });

    this.metaService.updateTag({ name: 'article:section', content: this.article.categorie.categorie });

    this.metaService.updateTag({ name: 'article:tag', content: this.hashtagExtractorService.extractHashtags(this.article.motclef)   });
    this.metaService.updateTag({ name: 'article:author', content: this.article.auteur });
    this.metaService.updateTag({ name: 'article:publisher', content: 'camer-sport.com' });
    this.titleService.setTitle(title);

    const jsonLd={
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "url": `${window.location.protocol}//${window.location.host}${this.router.url}`,
      "publisher":{
        "@type":"Organization",
        "name":"Camer-Sport",
        "logo":`${window.location.protocol}//${window.location.host}/assets/camersport.png`,
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${window.location.protocol}//${window.location.host}${this.router.url}`
      },
      "headline": this.article.titre,
      "image": {
        "@type": "ImageObject",
        "url": this.article.images[0].url,
        "width": 500,
        "height": 500
      },
      "datePublished": articleDate,
      "dateModified": today,
      "author": {
        "@type": "Person",
        "name": this.article.auteur
      },
      "description": this.article.chapeau,
      "articleSection": this.article.categorie.categorie,
      "articleBody": this.article.article,
      "keywords": this.hashtagExtractorService.removeHashtags(this.article.motclef),
      "inLanguage": "fr",
      "articleTag": this.hashtagExtractorService.extractHashtags(this.article.motclef),

    };
    this.jldService.setJsonLd(jsonLd);


  }

  private appendCountryIfFound(title: string,country:string) :string{
    if (!title.toLowerCase().includes(country.toLowerCase())) {
      return `${country} ${title} `;
    }
    return title;
  }
  // gotoArticle(slug: string) {
  //   this.router.navigate([ '/article',slug], {
  //   onSameUrlNavigation: 'reload'
  //   })
  // }
  gotoArticle(slug: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/article', slug]);
    });
  }
}
