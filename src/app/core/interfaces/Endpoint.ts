export interface EndpointI {
  se_id: number; // era string, pero viene como número
  se_sistema_id: string;
  se_nombre: string;
  se_url: string;
  se_metodo_http: string;
  se_requiere_transformar: boolean; // era string, pero viene como boolean
  se_usua_id: string;
  se_fecha_actividad: string;
  se_ind_estado: string;
  se_requiere_auth: boolean | null; // era string, pero puede venir como null o boolean
}
