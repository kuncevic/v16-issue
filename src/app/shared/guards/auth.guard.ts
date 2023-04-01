import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { AuthenticationService } from '../../auth/auth.service';
import { isAfter } from 'date-fns';

export const authGuard = () => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const authService = inject(AuthenticationService);

  const user = authService.getCurrentUser();

  if (user && user.expiration) {
    if (isAfter(user.expiration, new Date())) {
      return true;
    } else {
      notificationService.openSnackBar('Your session has expired');
      router.navigate(['auth/login']);
      return false;
    }
  }

  router.navigate(['auth/login']);
  return false;
};
