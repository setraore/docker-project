import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app/services/app-config.service';
import { APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import 'zone.js';

export function initConfig(cfg: AppConfigService) {
  return () => cfg.load();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(ReactiveFormsModule, HttpClientModule),
    AppConfigService,
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfigService], multi: true },
    provideRouter(routes)
  ]
});
