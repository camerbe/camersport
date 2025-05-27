import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { LayoutComponent } from './layout/layout.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MenuComponent } from './components/menu/menu.component';
import { PanelModule } from 'primeng/panel';
import { AdsComponent } from './components/ads/ads.component';
import { ChipModule } from 'primeng/chip';
import {StyleClassModule} from 'primeng/styleclass';
import { HomeComponent } from './home/home.component';
import { DividerModule } from 'primeng/divider';
import { ApiFootballComponent } from './components/api-football/api-football.component';
import { ArticleComponent } from './layout/article/article.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { RssComponent } from './layout/rss/rss.component';
import { DataViewModule } from 'primeng/dataview';
import { AvatarModule } from 'primeng/avatar';
import { TaboolaComponent } from './components/taboola/taboola.component';
import { NotCamerComponent } from './components/not-camer/not-camer.component';
import { FieldsetModule } from 'primeng/fieldset';
import { CategorieMustReadedComponent } from './components/categorie-must-readed/categorie-must-readed.component';
import { CompetitionMustReadedComponent } from './components/competition-must-readed/competition-must-readed.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { TimelineModule } from 'primeng/timeline';
import { ThemoneytizerComponent } from './components/themoneytizer/themoneytizer.component';
import { ViralizeComponent } from './components/viralize/viralize.component';
import { LionsIndomptablesComponent } from './layout/lions-indomptables/lions-indomptables.component';
import { PaginatorModule } from 'primeng/paginator';
import { CompetitionsComponent } from './layout/competitions/competitions.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToolbarModule } from 'primeng/toolbar';
import { ClassementComponent } from './components/classement/classement.component';
import { DialogModule } from 'primeng/dialog';
import { CompetitionDetailComponent } from './layout/competition-detail/competition-detail.component';
import { CompetitionNotFoundComponent } from './components/competition-not-found/competition-not-found.component';
import { MatchMtnComponent } from './components/match-mtn/match-mtn.component';
import { LiveComponent } from './layout/live/live.component';
import { LiveMatchComponent } from './components/live-match/live-match.component';


@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent,
    CarouselComponent,
    MenuComponent,
    AdsComponent,
    HomeComponent,
    ApiFootballComponent,
    ArticleComponent,
    RssComponent,
    TaboolaComponent,
    NotCamerComponent,
    CategorieMustReadedComponent,
    CompetitionMustReadedComponent,
    ThemoneytizerComponent,
    ViralizeComponent,
    LionsIndomptablesComponent,
    CompetitionsComponent,
    ClassementComponent,
    CompetitionDetailComponent,
    CompetitionNotFoundComponent,
    MatchMtnComponent,
    LiveComponent,
    LiveMatchComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CarouselModule,
    ImageModule,
    CardModule,
    MenubarModule,
    PanelModule,
    ChipModule,
    StyleClassModule,
    DividerModule,
    ScrollTopModule,
    DataViewModule,
    AvatarModule,
    FieldsetModule,
    TabMenuModule,
    TimelineModule,
    PaginatorModule,
    BreadcrumbModule,
    ToolbarModule,
    DialogModule

  ],
  exports: [AdsComponent]
})
export class PublicModule { }
