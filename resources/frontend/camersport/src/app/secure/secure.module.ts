import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SecureComponent} from "./secure.component";
import { UserComponent } from './user/user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { HeaderListComponent } from './components/header-list/header-list.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { CategorieComponent } from './categorie/categorie/categorie.component';
import { CategorieListComponent } from './categorie/categorie-list/categorie-list.component';
import { CompetitionComponent } from './competition/competition/competition.component';
import { CompetitionListComponent } from './competition/competition-list/competition-list.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleComponent } from './article/article/article.component';
import {EditorComponent} from "@tinymce/tinymce-angular";
import {EditorModule, TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";




@NgModule({
  declarations: [
    SecureComponent,
    UserComponent,
    UserListComponent,
    HeaderListComponent,
    SubmitButtonComponent,
    CategorieComponent,
    CategorieListComponent,
    CompetitionComponent,
    CompetitionListComponent,
    ArticleListComponent,
    ArticleComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        ReactiveFormsModule,
        EditorComponent,
        EditorModule
    ],
  providers: [
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}
  ]
})
export class SecureModule { }
