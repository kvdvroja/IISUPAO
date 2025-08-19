export interface Programacion_JobI {
  pj_id: number;
  pj_pi_id: string; 
  pj_dia: "LUN" | "MAR" | "MIE" | "JUE" | "VIE" | "SAB" | "DOM" | "ALL";
  pj_hora: string;
  pj_tipo: "INCLUDE" | "EXCLUDE";
  pj_usua_id: string;
  pj_fecha: Date;
  pj_frecuencia: "DIARIA" | "SEMANAL" | "MENSUAL" | "UNICA";
  pj_dia_mes: number; 
  pj_ind_estado: "ACTIVO" | "INACTIVO" | "PAUSADO";
  pj_fecha_unica: Date;
  pj_fecha_inicio: Date;
  pj_fecha_fin: Date;
  pj_descripcion: string;
  pj_fecha_mod: Date;
  pj_ultima_ejecucion: Date;
  pj_proxima_ejecucion: Date;
  pj_zona_horaria: string; 
  pj_prioridad: number; 
  pj_schedule_version: number;
}