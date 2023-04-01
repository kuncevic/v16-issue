// Note: loader import location set using "esmLoaderPath" within the output target config
// import {
//   applyPolyfills,
//   defineCustomElements,
// } from '@revolist/revogrid/loader';
import { bootstrapApplication } from '@angular/platform-browser';
import { ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { authRoutes, panelRoutes } from './app/app.routes';
import { NavService } from './app/layout/nav.service';
import { authGuard } from './app/shared/guards/auth.guard';
import { MediaMatcher } from '@angular/cdk/layout';
import { SpinnerInterceptor } from './app/shared/interceptors/spinner.interceptor';
import { AuthInterceptor } from './app/shared/interceptors/auth.interceptor';
import { GlobalErrorHandler } from './app/shared/services/globar-error.handler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoggerModule, NGXLogger } from 'ngx-logger';
import { environment } from './environments/environment';
import { MatDialogModule } from '@angular/material/dialog';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      LoggerModule.forRoot({
        serverLoggingUrl: `http://my-api/logs`,
        level: environment.logLevel,
        serverLogLevel: environment.serverLogLevel,
      })
    ),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(MatDialogModule),
    provideRouter([
      {
        path: 'auth',
        loadChildren: authRoutes,
      },
      {
        path: 'panel',
        loadChildren: panelRoutes,
        canActivate: [authGuard],
      },
      {
        path: '**',
        redirectTo: 'panel',
        pathMatch: 'full',
      },
    ]),
    NavService,
    MediaMatcher,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    { provide: NGXLogger, useClass: NGXLogger },
    { provide: 'LOCALSTORAGE', useValue: window.localStorage },
  ],
});
