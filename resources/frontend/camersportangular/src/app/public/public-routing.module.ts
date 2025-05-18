import { articleSlugResolver } from './../shared/resolvers/article-slug.resolver';
import { articleItemsResolver } from './../shared/resolvers/article-items.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './layout/article/article.component';
import { RssComponent } from './layout/rss/rss.component';

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
        resolve: {slug:articleSlugResolver}
      }


    ]
  },
  { path:'login',component:LoginComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
