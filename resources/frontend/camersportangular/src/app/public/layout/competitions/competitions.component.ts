import { AfterViewInit, Component, ElementRef, Inject, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ArticleDetail } from '../../../core/models/article-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleItemsService } from '../../../services/article-items.service';
import { JsonLdService } from '../../../services/json-ld.service';
import { HashtagExtractorService } from '../../../services/hashtag-extractor.service';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../../../services/canonical.service';
import { isPlatformBrowser } from '@angular/common';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css'
})
export class CompetitionsComponent implements  OnInit {
  @ViewChild('competition') compet!: ElementRef;

    articles:ArticleDetail[]=[];
    labelCompetition!:string;
    // articleItemService:ArticleItemsService=inject(ArticleItemsService);
    // jsonLdService:JsonLdService=inject(JsonLdService);
    // hashtagExtractorService:HashtagExtractorService=inject(HashtagExtractorService);
    // metaService:Meta=inject(Meta);
    // titleService:Title=inject(Title);
    // canonicalService:CanonicalService=inject(CanonicalService);
    // articleItemsService:ArticleItemsService=inject(ArticleItemsService);
    // router:Router = inject(Router);
    // route:ActivatedRoute = inject(ActivatedRoute);
    articlesPerPage = 10;
    currentPage = 0;
    pagedArticles: ArticleDetail[] = [];
    jsonLdArticles:ArticleDetail[]=[];
    jsonldArticle: any[] = [];
    article!:ArticleDetail;
    slug!:string;
    isBrowser: boolean;

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
  }
  ngOnInit(): void {
    if(!this.isBrowser) return;
    this.slug=this.route.snapshot.params['competition'];


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
