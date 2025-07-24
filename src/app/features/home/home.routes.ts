import { Routes } from '@angular/router';
import { Home } from './home'; // standalone: true

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: 'Sistemas',
        loadChildren: () =>
          import('../sistemas/sistemas.routes').then((m) => m.SISTEMAS_ROUTES),
      }
    ]
  }
];