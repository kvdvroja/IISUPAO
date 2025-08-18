export interface EndpointI {
  se_id: number;
  se_sistema_id: string;
  se_nombre: string;
  se_url: string;
  se_metodo_http: string;
  se_requiere_transformar: boolean; 
  se_usua_id: string;
  se_fecha_actividad: string;
  se_ind_estado: string;
  se_requiere_auth: boolean | null; 
  se_tipo: string;
}
