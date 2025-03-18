import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { CompetitionComponent } from './shared/dashboard/competition/competition.component';

@NgModule({
  declarations: [
    AppComponent,
    CompetitionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideHttpClient(withInterceptors([
        authInterceptor
    ]), withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
