import { Component, Inject, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ArticleItemsService } from '../../../services/article-items.service';
import { ArticleDetail } from '../../../core/models/article-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Article } from '../../../core/models/article';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-categorie-must-readed',
  templateUrl: './categorie-must-readed.component.html',
  styleUrl: './categorie-must-readed.component.css'
})
export class CategorieMustReadedComponent implements OnInit {
  @Input() mustReadedCategorie: ArticleDetail[] = [];
  @Input() mustReadedLabel: string = '';

  router:Router=inject(Router);

  ngOnInit(): void {

  }
  gotoArticle(slug: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/article', slug]);
    });
  }
}
