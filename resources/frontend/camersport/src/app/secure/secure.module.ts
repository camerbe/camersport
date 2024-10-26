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




@NgModule({
  declarations: [
    SecureComponent,
    UserComponent,
    UserListComponent,
    HeaderListComponent,
    SubmitButtonComponent,
    CategorieComponent,
    CategorieListComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ]
})
export class SecureModule { }
