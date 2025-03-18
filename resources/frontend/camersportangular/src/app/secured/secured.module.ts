import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuredRoutingModule } from './secured-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './dashboard/components/title/title.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    SecuredRoutingModule,
    ReactiveFormsModule
  ]
})
export class SecuredModule { }
