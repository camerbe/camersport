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
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './components/title/title.component';
import { ButtonLinkComponent } from './components/button-link/button-link.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { SplitterModule } from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { FieldsetModule } from 'primeng/fieldset';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { MatchSheetComponent } from './match-sheet/match-sheet.component';
import { MatchSheetListComponent } from './match-sheet/match-sheet-list/match-sheet-list.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MessageModule } from 'primeng/message';

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
    LiveListComponent,
    TitleComponent,
    ButtonLinkComponent,
    ArticleComponent,
    ArticleListComponent,
    TeamComponent,
    TeamListComponent,
    MatchSheetComponent,
    MatchSheetListComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    EditorModule,
    DropdownModule,
    TableModule,
    ToolbarModule,
    CheckboxModule,
    TooltipModule,
    CalendarModule,
    InputNumberModule,
    SplitterModule,
    DividerModule,
    AvatarModule,
    FieldsetModule,
    ColorPickerModule,
    MessageModule,

  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },

  ],
})
export class DashboardModule { }
