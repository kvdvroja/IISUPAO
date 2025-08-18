export interface AutenticacionI {
  auth_id: number;
  auth_nombre: string;
  tipo_auth: string;
  auth_body_template: string;
  auth_headers_template: string;
  auth_params_template: string;
  auth_token_path: string; 
  auth_tiempo_expira: number;
  auth_ind_estado: string;
  auth_fecha_actividad: Date; 
  auth_usua_id: string;
  credenciales: string;
}