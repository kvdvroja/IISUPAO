import { Routes } from '@angular/router';
import { Inicio } from './features/inicio/inicio';

export const routes: Routes = [
  {
    path: '',
    component: Inicio,
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./layouts/main-layout/main-layout.routes').then(
        (m) => m.MAIN_LAYOUT
      ),
  }
];
