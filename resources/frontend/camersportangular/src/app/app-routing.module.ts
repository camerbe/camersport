import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',loadChildren:(()=>import('./public/public.module').then(m=>m.PublicModule))
  },
  {
    path:'secured',loadChildren:(()=>import('./secured/secured.module').then(m=>m.SecuredModule))
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
