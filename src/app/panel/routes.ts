import { Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { CustomerComponent } from './lazy1/lazy1.component';
import { InvoicesComponent } from './lazy2/lazy2.component';

export const LAZY_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'lazy1', pathMatch: 'full' },
      { path: 'lazy1', component: CustomerComponent },
      { path: 'lazy2', component: InvoicesComponent },
    ],
  },
];
