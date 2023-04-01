import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../../auth/auth.service';

export const adminGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  const user = authService.getCurrentUser();

  if (user && user.roles.includes(1)) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
