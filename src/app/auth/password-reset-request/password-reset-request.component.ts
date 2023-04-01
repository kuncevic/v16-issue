import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.scss'],
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
export class PasswordResetRequestComponent implements OnInit {
  private email!: string;
  form!: UntypedFormGroup;
  loading!: boolean;
  router = inject(Router);
  titleService = inject(Title);
  notificationService = inject(NotificationService);
  authService = inject(AuthenticationService);
  constructor() {}

  ngOnInit() {
    this.titleService.setTitle('Issue - Password Reset Request');

    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });

    this.form.get('email')?.valueChanges.subscribe((val: string) => {
      this.email = val.toLowerCase();
    });
  }

  resetPassword() {
    this.loading = true;
    this.authService.passwordResetRequest(this.email).subscribe(
      results => {
        this.router.navigate(['/auth/login']);
        this.notificationService.openSnackBar(
          'Password verification mail has been sent to your email address.'
        );
      },
      error => {
        this.loading = false;
        this.notificationService.openSnackBar(error.error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
