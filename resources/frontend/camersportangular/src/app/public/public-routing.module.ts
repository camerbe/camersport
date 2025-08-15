import { ResetPasswordComponent } from './register-password/reset-password/reset-password.component';
import { articleSlugResolver } from './../shared/resolvers/article-slug.resolver';
import { articleItemsResolver } from './../shared/resolvers/article-items.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './layout/article/article.component';
import { RssComponent } from './layout/rss/rss.component';
import { LionsIndomptablesComponent } from './layout/lions-indomptables/lions-indomptables.component';
import { CompetitionsComponent } from './layout/competitions/competitions.component';
import { CompetitionDetailComponent } from './layout/competition-detail/competition-detail.component';
import { LiveComponent } from './layout/live/live.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';

const routes: Routes = [
  // Routes publiques sans layout

  { path: 'register/:id', component: RegisterPasswordComponent },
  { path: 'reset/:token', component: ResetPasswordComponent },

  // Routes principales avec layout
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: 'accueil',
        component: HomeComponent,
        resolve: { articleItems: articleItemsResolver }
      },
      {
        path: ':slug',
        component: ArticleComponent,
        resolve: { slug: articleSlugResolver },
        runGuardsAndResolvers: 'always'
      },
      { path: 'rss', component: RssComponent },
      // {
      //   path: ':slug',
      //   component: ArticleComponent,
      //   resolve: { slug: articleSlugResolver },
      //   runGuardsAndResolvers: 'paramsChange'
      // },
      {
        path: 'article/categorie/:categorie_id',
        component: ArticleComponent
      },
      {
        path: 'article/competition/:competition_id',
        component: ArticleComponent
      },
      // {
      //   path: 'lions-indomptables',
      //   component: LionsIndomptablesComponent
      // },
      { path: 'live', component: LiveComponent },
      {
        path: 'competitions',
        component: CompetitionsComponent,
        children: [
          {
            path: ':competition',
            component: CompetitionDetailComponent,
            //runGuardsAndResolvers: 'paramsChange'
            resolve: {
              articleItems: articleItemsResolver
            }
          }
        ]
      },

    ]
  },
  //{ path: '**', redirectTo: 'accueil' }
  // Redirection pour les routes inconnues
  //{ path: '**', component: Pa }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
