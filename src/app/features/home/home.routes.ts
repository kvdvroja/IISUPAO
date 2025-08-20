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
      },
      {
        path: 'Endpoints',
        loadChildren: () =>
          import('../endpoints/endpoints.routes').then(
            (m) => m.ENDPOINTS_ROUTES
          ),
      },
      {
        path: 'Usuarios',
        loadChildren: () =>
          import('../usuarios/usuarios.routes').then((m) => m.USUARIOS_ROUTES),
      },
      {
        path: 'Plantilla-Destino',
        loadChildren: () =>
          import('../plantilla-destino/plantilla-destino.routes').then(
            (m) => m.PLANTILLA_DESTINO_ROUTES
          ),
      },
      {
        path: 'Plantilla-Integracion',
        loadChildren: () =>
          import('../plantillas/plantillas.route').then(
            (m) => m.PLANTILLA_INTEGRACION_ROUTES
          ),
      },
      {
        path: 'Transformacion-Campos',
        loadChildren: () =>
          import('../transformacion-campos/transformacion-campos.routes').then(
            (m) => m.TRANSFORMACION_CAMPOS_ROUTES
          ),
      },
      {
        path: 'Transformacion-Valores',
        loadChildren: () =>
          import(
            '../transformacion-valores/transformacion-valores.routes'
          ).then((m) => m.TRANSFORMACION_VALORES_ROUTES),
      },
      {
        path: 'Colas',
        loadChildren: () =>
          import('../colas/colas.routes').then((m) => m.COLAS_ROUTES),
      },
    ],
  },
];
