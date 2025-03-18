import { ResolveFn } from '@angular/router';
import { Article } from '../../core/models/article';
import { ArticleService } from '../../services/article.service';
import { inject } from '@angular/core';

export const articleResolver: ResolveFn<Article | null> = (route, state) => {
  const id= route.params["id"];
  if (!id) return null;
  return inject(ArticleService).show(id);
};
