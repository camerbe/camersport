import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ArticleDetail } from '../../../core/models/article-detail';
import { Router } from '@angular/router';


@Component({
  selector: 'app-competition-must-readed',
  templateUrl: './competition-must-readed.component.html',
  styleUrl: './competition-must-readed.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CompetitionMustReadedComponent {
  @Input() mustReadedCompetition: ArticleDetail[] = [];
  @Input() mustReadedLabel: string = '';

  router:Router=inject(Router);

  gotoArticle(slug: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/article', slug]);
    });
  }
}
