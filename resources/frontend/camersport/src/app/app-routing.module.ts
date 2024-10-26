import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./public/login/login.component";
import {ChangePasswordComponent} from "./public/change-password/change-password.component";
import {SecureComponent} from "./secure/secure.component";
import {UserComponent} from "./secure/user/user/user.component";
import {UserListComponent} from "./secure/user/user-list/user-list.component";

  const routes: Routes = [
    {
      path:'dashboard',
      component:SecureComponent,
      children:[
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
