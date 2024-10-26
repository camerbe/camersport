import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterOutlet} from "@angular/router";
import { ReactiveFormsModule} from "@angular/forms";
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
