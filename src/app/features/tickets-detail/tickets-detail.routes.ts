import { Routes } from '@angular/router';
import { TicketsDetail } from './tickets-detail';

export const TICKETS_DETAIL_ROUTES: Routes = [
  { path: ':id', component: TicketsDetail }
];