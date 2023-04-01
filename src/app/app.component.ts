import { Component, ErrorHandler } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkWithHref,
    CommonModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AppComponent {}
