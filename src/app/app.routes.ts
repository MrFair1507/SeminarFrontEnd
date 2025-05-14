import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./features/courses/courses.module').then(
            (m) => m.CoursesModule
          ),
      },
      {
        path: 'my-courses',
        loadComponent: () =>
          import('./features/my-courses/my-courses.component').then(
            (c) => c.MyCoursesComponent
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./features/cart/cart.module').then((m) => m.CartModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
