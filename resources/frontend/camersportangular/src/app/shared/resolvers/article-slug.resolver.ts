import { ResolveFn } from '@angular/router';
import { Article } from '../../core/models/article';
import { inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';

export const articleSlugResolver: ResolveFn<Article | null> = (route, state) => {
  const slug= route.params["slug"];
    if (!slug) return null;
    return inject(ArticleService).getArticlesBySlug(slug);
};
