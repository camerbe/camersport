import { articleSlugResolver } from './../shared/resolvers/article-slug.resolver';
import { articleItemsResolver } from './../shared/resolvers/article-items.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './layout/article/article.component';
import { RssComponent } from './layout/rss/rss.component';
import { LionsIndomptablesComponent } from './layout/lions-indomptables/lions-indomptables.component';
import { CompetitionsComponent } from './layout/competitions/competitions.component';
import { CompetitionDetailComponent } from './layout/competition-detail/competition-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path:'',
        redirectTo:'accueil',
        pathMatch:"full"
      },
      {
        path:'accueil',component:HomeComponent,
        resolve: {articleItems:articleItemsResolver}
      },
      {
        path:'rss',component:RssComponent,

      },
      {
        path:'article/:slug',component:ArticleComponent,
        resolve: {slug:articleSlugResolver},
        runGuardsAndResolvers: 'paramsChange'
      }
      ,
      { path:'article/categorie/:categorie_id',component:ArticleComponent},
      { path:'article/competition/:competition_id',component:ArticleComponent},
      { path:'lions-indomptables',component:LionsIndomptablesComponent},
      { path:'competitions',component:CompetitionsComponent,
        children:[
          {
            path:':competition',
            component:CompetitionDetailComponent,
            runGuardsAndResolvers: 'paramsChange'
          }

        ]
      },


    ]
  },
  { path:'login',component:LoginComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
