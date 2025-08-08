import { Routes } from '@angular/router';
import { MainLayout } from './main-layout';

export const MAIN_LAYOUT: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'IISMuro',
        loadChildren: () =>
          import('../../features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'Tickets',
        loadChildren: () =>
          import('../../features/tickets/tickets.routes').then((m) => m.TICKETS_ROUTES),
      },
            {
        path: 'tickets-detail',
        loadChildren: () =>
          import('../../features/tickets-detail/tickets-detail.routes').then((m) => m.TICKETS_DETAIL_ROUTES),
      },
      {
        path: 'Menu',
        loadChildren: () =>
          import('../../features/menu-instructivo/menu-instructivo.routes').then((m) => m.MENU_INSTRUCTIVO_ROUTES),
      }
    ],
  },
];
