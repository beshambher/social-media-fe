import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInitService, initializeApp } from './core/services/initializer/app-init.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    provideAppInitializer(() => {
      const initializerFn = (initializeApp)(inject(AppInitService));
      return initializerFn();
    }),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
