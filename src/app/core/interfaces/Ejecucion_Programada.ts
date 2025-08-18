export interface Ejecucion_ProgramadaI {
  sr_id: number;
  sr_pj_id: number;
  sr_scheduled_at_local: Date;  
  sr_scheduled_at_utc: Date;  
  sr_schedule_version: number;
  sr_publish_status: string;
  sr_planned_at: Date;   
  sr_planned_by: string;       
  sr_published_at: Date;        
  sr_rabbit_exchange: string;
  sr_rabbit_routing_key: string;
  sr_rabbit_message_id: string;
  sr_cancel_reason: string;     
}