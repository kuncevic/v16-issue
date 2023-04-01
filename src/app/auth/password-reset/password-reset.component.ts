import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  imports: [
    NgIf,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  standalone: true,
  providers: [NotificationService],
})
export class PasswordResetComponent implements OnInit {
  private token!: string;
  email!: string;
  form!: UntypedFormGroup;
  loading!: boolean;
  hideNewPassword: boolean;
  hideNewPasswordConfirm: boolean;

  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  titleService = inject(Title);
  notificationService = inject(NotificationService);
  authService = inject(AuthenticationService);

  constructor() {
    this.titleService.setTitle('Issue - Password Reset');
    this.hideNewPassword = true;
    this.hideNewPasswordConfirm = true;
  }

  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
      this.token = params.get('token') + '';
      this.email = params.get('email') + '';

      if (!this.token || !this.email) {
        this.router.navigate(['/']);
      }
    });

    this.form = new UntypedFormGroup({
      newPassword: new UntypedFormControl('', Validators.required),
      newPasswordConfirm: new UntypedFormControl('', Validators.required),
    });
  }

  resetPassword() {
    const password = this.form.get('newPassword')?.value;
    const passwordConfirm = this.form.get('newPasswordConfirm')?.value;

    if (password !== passwordConfirm) {
      this.notificationService.openSnackBar('Passwords do not match');
      return;
    }

    this.loading = true;

    this.authService
      .passwordReset(this.email, this.token, password, passwordConfirm)
      .subscribe(
        () => {
          this.notificationService.openSnackBar(
            'Your password has been changed.'
          );
          this.router.navigate(['/auth/login']);
        },
        (error: any) => {
          this.notificationService.openSnackBar(error.error);
          this.loading = false;
        }
      );
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
