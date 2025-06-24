import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// Ensure the path and class name are correct and match the actual file and export.
// FIX: Update the path below if the file exists elsewhere, or ensure the file exists at the specified path.
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
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
//import { TeamComponent } from './secured/dashboard/team/team.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { PublicModule } from './public/public.module';
import { DashboardModule } from './secured/dashboard/dashboard.module';


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    // RegisterComponent,
    // RegisterListComponent,
    // CategorieComponent,
    // CategorieListComponent,
    // CompetitionComponent,
    // CompetitionListComponent,
    // VideoComponent,
    // VideoListComponent,
    // LiveComponent,
    // LiveListComponent,
    // TitleComponent,
    // ButtonLinkComponent,
    // ArticleComponent,
    // ArticleListComponent,
    // TeamComponent,
    // TeamListComponent,
    // MatchSheetComponent,
    // MatchSheetListComponent,
    // LiveMatchComponent,
    // LiveMatchListComponent,
    // UnauthorizeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //PublicModule,
    //DashboardModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideAnimations(),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true
      })
    ),
    provideHttpClient(),
    provideHttpClient(
      withInterceptors([
        authInterceptor
    ]),
    withFetch()),


  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
