export const environment = {
  production: false,
  apiLocalUrl: 'http://127.0.0.1:8015', // cambia según entorno
  apiVersion: 'v1',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc1NjI0MzcxNH0.IW2kFySb0F7m6zBOBfBq-zd1uSpE03hWCu1zWHc5d28',
  get apiBaseUrl() {
    return `${this.apiLocalUrl}/api/${this.apiVersion}/`;
  },
  get mainApiUrl() { return `${this.apiBaseUrl}main/`; },
  get sistemasApiUrl() { return `${this.mainApiUrl}sistema`; },
  get endpointsApiUrl() { return `${this.mainApiUrl}endpoint`; },
  get plantillaIntegracionApiUrl() { return `${this.mainApiUrl}template_integration`; },
  get plantillaDestinoApiUrl() { return `${this.mainApiUrl}template_end`; },
  get transformacionCampospiUrl() { return `${this.mainApiUrl}transformable_campo`; },
  get transformacionValorespiUrl() { return `${this.mainApiUrl}transformable_valor`; },

  get ticketsApiUrl() { return `${this.apiBaseUrl}tickets/`; },
  get getAllTickets() { return `${this.ticketsApiUrl}get_all_tickets`; },
  get TicketsCrudUrl() { return `${this.ticketsApiUrl}crud`; },

  get usuariosApiUrl() { return `${this.apiBaseUrl}users/`; },
  get getAllUsuarios() { return `${this.usuariosApiUrl}get_all_users`; },
  get UsuarioCrudUrl() { return `${this.usuariosApiUrl}crud_users`; },

  get colasApiUrl() { return `${this.apiBaseUrl}queues/`; },
  get getAllColas() { return `${this.colasApiUrl}get_all_queue`; },
  get colasCrudUrl() { return `${this.colasApiUrl}crud`; },

  get autenticacionApiUrl() { return `${this.apiBaseUrl}authentication/`; },
  get getAllAutenticacion() { return `${this.autenticacionApiUrl}get_all_authentication`; },
  get autenticacionCrudUrl() { return `${this.autenticacionApiUrl}crud`; },

  get programacionJobApiUrl() { return `${this.apiBaseUrl}programacionjobs/`; },
  get getAllProgramacionJob() { return `${this.programacionJobApiUrl}get_all_programacionjobs`; },
  get programacionJobCrudUrl() { return `${this.programacionJobApiUrl}crud`; },

  urlSSO: 'https://upaosso.upao.edu.pe:420',
  urlAngular: 'http://localhost:4200/#',
  cryptoIv: '1234567890123456',
  jwtSSOKey: "ZGV2QHRlc2lzQGNsYXZlQHNlY3JldGFAdXBhb0AyMDI1",
  clientAdmi: "dev-upao-tesis-client",
  cryptoKey: '12345678901234561234567890123456',
};
