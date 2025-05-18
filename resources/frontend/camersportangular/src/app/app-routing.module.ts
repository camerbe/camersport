import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren:(()=>import('./public/public.module').then(m=>m.PublicModule))
  },
  {
    path:'secured',loadChildren:(()=>import('./secured/secured.module').then(m=>m.SecuredModule))
  },
  { path: '**', component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
