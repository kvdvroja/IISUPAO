// src/app/app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'tickets-detail/:id', renderMode: RenderMode.Server },
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'Tickets', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server }
];
