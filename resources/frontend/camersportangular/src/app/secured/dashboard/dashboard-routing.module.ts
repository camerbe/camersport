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
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { teamResolver } from '../../shared/resolvers/team.resolver';
import { MatchSheetComponent } from './match-sheet/match-sheet.component';
import { matchSheetResolver } from '../../shared/resolvers/match-sheet.resolver';
import { MatchSheetListComponent } from './match-sheet/match-sheet-list/match-sheet-list.component';
import { LiveMatchComponent } from './live-match/live-match.component';
import { LiveMatchListComponent } from './live-match/live-match-list/live-match-list.component';
import { liveMatchResolver } from '../../shared/resolvers/live-match.resolver';
import { adminGuard } from '../../shared/admin.guard';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';

const routes: Routes = [
  {
    path:'',component:DashboardComponent,
    children:[

      {
        path:'register',
        component:RegisterComponent,
        canMatch:[adminGuard]
      },
      {
        path:'register/list',
        component:RegisterListComponent,
         canMatch:[adminGuard]
      },
      { path : "register/show/:id",component:RegisterComponent,
        resolve : { user: userResolver },
        canMatch:[adminGuard]
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
        resolve : { article : articleResolver },
      },
      {path:'team',component:TeamComponent},
      {path:'team/list',component:TeamListComponent},
      { path : "team/show/:id",component:TeamComponent,
        resolve : { team : teamResolver },
      },
      {path:'matchsheet',component:MatchSheetComponent},
      {path:'matchsheet/list',component:MatchSheetListComponent},
      { path : "matchsheet/show/:id",component:MatchSheetComponent,
        resolve : { matchsheet : matchSheetResolver },
      },
      {path:'live',component:LiveMatchComponent},
      {path:'live/list',component:LiveMatchListComponent},
      {path:'live/show/:id',component:LiveMatchComponent
        ,resolve : { liveMatch : liveMatchResolver },
      },
      {path:'unauthorized',component:UnauthorizeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
