import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { RegisterComponent } from './register/register.component';
import { RegisterListComponent } from './register/register-list/register-list.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CategorieListComponent } from './categorie/categorie-list/categorie-list.component';
import { CompetitionComponent } from './competition/competition.component';
import { CompetitionListComponent } from './competition/competition-list/competition-list.component';
import { VideoComponent } from './video/video.component';
import { VideoListComponent } from './video/video-list/video-list.component';
import { LiveComponent } from './live/live.component';
import { LiveListComponent } from './live/live-list/live-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RegisterComponent,
    RegisterListComponent,
    CategorieComponent,
    CategorieListComponent,
    CompetitionComponent,
    CompetitionListComponent,
    VideoComponent,
    VideoListComponent,
    LiveComponent,
    LiveListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
