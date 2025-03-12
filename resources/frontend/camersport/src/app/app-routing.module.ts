import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./public/login/login.component";
import {ChangePasswordComponent} from "./public/change-password/change-password.component";
import {SecureComponent} from "./secure/secure.component";
import {UserComponent} from "./secure/user/user/user.component";
import {UserListComponent} from "./secure/user/user-list/user-list.component";
import {CategorieListComponent} from "./secure/categorie/categorie-list/categorie-list.component";
import {CategorieComponent} from "./secure/categorie/categorie/categorie.component";
import {CompetitionListComponent} from "./secure/competition/competition-list/competition-list.component";
import {CompetitionComponent} from "./secure/competition/competition/competition.component";
import {ArticleListComponent} from "./secure/article/article-list/article-list.component";
import {ArticleComponent} from "./secure/article/article/article.component";

  const routes: Routes = [
    {
      path:'dashboard',
      component:SecureComponent,
      children:[
        {
          path:'logout',
          component: SecureComponent
        },
        {
          path:'user/list',
          component: UserListComponent
        },
        {
          path:'user/edit/:id',
          component:UserComponent
        },
        {
          path:'user/add',
          component:UserComponent
        },
        {
          path:'categorie/list',
          component: CategorieListComponent
        },
        {
          path:'categorie/edit/:id',
          component:CategorieComponent
        },
        {
          path:'categorie/add',
          component:CategorieComponent
        },
        {
          path:'competition/list',
          component: CompetitionListComponent
        },
        {
          path:'competition/edit/:id',
          component:CompetitionComponent
        },
        {
          path:'competition/add',
          component:CompetitionComponent
        },
        {
          path:'file-manager',
          component:ArticleComponent
        },
        {
          path:'article/list',
          component: ArticleListComponent
        },
        {
          path:'article/edit/:id',
          component:ArticleComponent
        },
        {
          path:'article/add',
          component:ArticleComponent
        }
      ]
    },
    {
      path:'login',
      component:LoginComponent
    },
    {
      path:'changePassword/:email',
      component:ChangePasswordComponent
    },
    {
      path:'dashboard',
      component:SecureComponent,
    }


  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
