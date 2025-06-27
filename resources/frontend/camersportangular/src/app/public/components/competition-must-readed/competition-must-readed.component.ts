import { ChangeDetectionStrategy, Component, Inject, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ArticleDetail } from '../../../core/models/article-detail';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../core/models/article';



@Component({
  selector: 'app-competition-must-readed',
  templateUrl: './competition-must-readed.component.html',
  styleUrl: './competition-must-readed.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CompetitionMustReadedComponenton implements OnInit {
  @Input() mustReadedCompetition: ArticleDetail[] = [];
  @Input() mustReadedLabel: string = '';
  //@Input() competitionID!: number ;

  //articles: ArticleDetail[] = [];
  // router:Router=inject(Router);
  /**
   *
   */
  isBrowser!: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private articleService: ArticleService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    if (!this.isBrowser) return;
    // this.articleService.competitionMustReaded(this.competitionID).subscribe({
    //   next: (data) => {
    //     const tempData = data as unknown as Article;
    //     this.articles = tempData['data'] as unknown as ArticleDetail[];
    //     console.log(this.articles);
    //   },
    //   error: (error) => {
    //     console.error('Erreur lors de la récupération des articles les plus lus:', error);
    //   }
    // });
  }

  gotoArticle(slug: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/article', slug]);
    });
  }
}
