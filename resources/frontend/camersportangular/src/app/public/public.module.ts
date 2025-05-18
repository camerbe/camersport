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
    RssComponent
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
    ScrollTopModule

  ],
  exports: [AdsComponent]
})
export class PublicModule { }
