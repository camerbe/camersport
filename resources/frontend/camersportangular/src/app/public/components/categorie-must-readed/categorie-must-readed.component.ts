import { ChangeDetectionStrategy, Component, Inject, inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { ArticleItemsService } from '../../../services/article-items.service';
import { ArticleDetail } from '../../../core/models/article-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Article } from '../../../core/models/article';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-categorie-must-readed',
  templateUrl: './categorie-must-readed.component.html',
  styleUrl: './categorie-must-readed.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CategorieMustReadedComponent implements OnInit {
  @Input() mustReadedCategorie: ArticleDetail[] = [];
  @Input() mustReadedLabel: string = '';

  isBrowser!: boolean;
  // private zone=inject(NgZone);
  // router:Router=inject(Router);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private router: Router,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }
  ngOnInit(): void {
    if (!this.isBrowser) return;

  }
  gotoArticle(slug: string) {
    if (!this.isBrowser) return;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/', slug]);
    });
  }
}
