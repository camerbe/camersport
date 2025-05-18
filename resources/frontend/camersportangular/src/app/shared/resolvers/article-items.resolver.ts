import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ArticleDetail } from '../../core/models/article-detail';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../core/models/article';
import { map } from 'rxjs';

export const articleItemsResolver: ResolveFn<ArticleDetail[]|null> = (route, state) => {
  //const articleItems = route.params["articleItems"];
  //if (!articleItems) return null;
  return inject(ArticleService).publicIndex().pipe(
    map((data) => {
      const tempData = data as unknown as Article;
      const articles = tempData["data"] as unknown as ArticleDetail[];
      return articles;
    })
  );
};
