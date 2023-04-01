import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { FlexModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  templateUrl: './login.component.html',
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatInputModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FlexModule,
    MatButtonModule,
  ],
  providers: [NotificationService],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  loading!: boolean;

  router = inject(Router);
  titleService = inject(Title);
  notificationService = inject(NotificationService);
  authenticationService = inject(AuthenticationService);
  constructor() {}

  ngOnInit() {
    this.titleService.setTitle('Issue - Login');
    this.authenticationService.logout();
    this.createForm();
  }

  private createForm() {
    const savedUserEmail = localStorage.getItem('savedUserEmail');

    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(savedUserEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', Validators.required),
      rememberMe: new UntypedFormControl(savedUserEmail !== null),
    });
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value;

    this.loading = true;
    this.authenticationService.login(email.toLowerCase(), password).subscribe(
      data => {
        if (rememberMe) {
          localStorage.setItem('savedUserEmail', email);
        } else {
          localStorage.removeItem('savedUserEmail');
        }
        this.router.navigate(['/']);
      },
      error => {
        this.notificationService.openSnackBar(error.error);
        this.loading = false;
      }
    );
  }

  resetPassword() {
    this.router.navigate(['/auth/password-reset-request']);
  }
}
