import { ResolveFn } from '@angular/router';
import { Categorie } from '../../core/models/categorie';
import { CategorieService } from '../../services/categorie.service';
import { inject } from '@angular/core';

export const categorieResolver: ResolveFn<Categorie | null> = (route, state) => {
  const id= route.params["id"];
  if (!id) return null;
  return inject(CategorieService).show(id);
};
