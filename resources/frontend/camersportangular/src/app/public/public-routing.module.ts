import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path:'login',component:LoginComponent },
  // { path:'dashboard',loadChildren:(()=>import('../secured/dashboard/dashboard.module').then(d=>d.DashboardModule))}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
