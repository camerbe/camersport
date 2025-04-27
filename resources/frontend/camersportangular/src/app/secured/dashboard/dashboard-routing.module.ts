import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RegisterComponent } from './register/register.component';
import { RegisterListComponent } from './register/register-list/register-list.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CategorieListComponent } from './categorie/categorie-list/categorie-list.component';
import { categorieResolver } from '../../shared/resolvers/categorie-resolver.resolver';
import { CompetitionComponent } from './competition/competition.component';
import { competitionResolver } from '../../shared/resolvers/competition.resolver';
import { CompetitionListComponent } from './competition/competition-list/competition-list.component';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { articleResolver } from '../../shared/resolvers/article.resolver';
import { userResolver } from '../../shared/resolvers/user.resolver';
import { LiveComponent } from './live/live.component';

const routes: Routes = [
  {
    path:'',component:DashboardComponent,
    children:[
      {path:'register',component:RegisterComponent},
      {path:'register/list',component:RegisterListComponent},
      { path : "register/show/:id",component:RegisterComponent,
        resolve : { user: userResolver },
      },
      {path:'categorie',component:CategorieComponent},
      {path:'categorie/list',component:CategorieListComponent},
      { path : "categorie/show/:id",component:CategorieComponent,
        resolve : { categorie : categorieResolver },
      },
      {path:'competition',component:CompetitionComponent},
      {path:'competition/list',component:CompetitionListComponent},
      { path : "competition/show/:id",component:CompetitionComponent,
        resolve : { competition : competitionResolver },
      },
      {path:'article',component:ArticleComponent},
      {path:'article/list',component:ArticleListComponent},
      { path : "article/show/:id",component:ArticleComponent,
        resolve : { articla : articleResolver },
      },
      {path:'live',component:LiveComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
