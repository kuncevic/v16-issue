import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
  EnvironmentInjector,
  runInInjectionContext,
  inject,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../shared/services/spinner.service';
import { AuthenticationService } from '../auth/auth.service';
import { navItems } from './menu';
import { MatIconModule } from '@angular/material/icon';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { NotificationService } from '../shared/services/notification.service';
import { authGuard } from '../shared/guards/auth.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MenuListItemComponent,
    RouterOutlet,
    RouterLinkWithHref,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    MatListModule,
    MatSnackBarModule,
    MatBadgeModule,
  ],
  providers: [NotificationService],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  private injector = inject(EnvironmentInjector);
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  showSpinner = false;
  userName = '';
  isAdmin = false;
  navItems = navItems;
  user: any;

  private autoLogoutSubscription: Subscription = new Subscription();
  changeDetectorRef = inject(ChangeDetectorRef);
  media = inject(MediaMatcher);
  spinnerService = inject(SpinnerService);
  authService = inject(AuthenticationService);
  constructor() {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();

    this.isAdmin = this.user.roles.includes(1);
    this.userName = this.user.fullName;

    // Auto log-out subscription
    const timer$ = timer(2000, 5000);
    this.autoLogoutSubscription = timer$.subscribe(() => {
      // was getting an error here, had to do that
      runInInjectionContext(this.injector, authGuard);
    });
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.autoLogoutSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  //TODO improve roles system, add role guards
  //TODO research optional feature enable/disable features option
  enabledRoute = (item: any, index: any) => {
    let inRoles;
    if (item.roles && item.roles.length) {
      inRoles = item.roles.filter((value: any) =>
        this.user.roles.includes(value)
      );

      return item.enabled && inRoles.length;
    } else {
      return item.enabled;
    }
  };
}
