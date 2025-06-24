import { ChangeDetectionStrategy, Component, Inject, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ArticleDetail } from '../../../core/models/article-detail';
import { Router } from '@angular/router';


@Component({
  selector: 'app-competition-must-readed',
  templateUrl: './competition-must-readed.component.html',
  styleUrl: './competition-must-readed.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CompetitionMustReadedComponenton implements OnInit {
  @Input() mustReadedCompetition: ArticleDetail[] = [];
  @Input() mustReadedLabel: string = '';

  // router:Router=inject(Router);
  /**
   *
   */
  isBrowser!: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router

  ) {
    this.isBrowser = typeof window !== 'undefined';
  }
  ngOnInit(): void {
    if (!this.isBrowser) return;
  }

  gotoArticle(slug: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/article', slug]);
    });
  }
}
