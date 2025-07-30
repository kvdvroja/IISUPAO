export const environment = {
  production: false,
  apiLocalUrl: 'http://127.0.0.1:8015', // cambia según entorno
  apiVersion: 'v1',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmlja25hbWUiOiJzeXMiLCJuYW1lIjoiTWt0T2ZmaWNlIiwibmJmIjoxNzQ1OTQ4NDMzLCJleHAiOjE3NDU5NTIwMzMsImlzcyI6Imh0dHBzOi8vdGVzaXMudXBhby5lZHUucGUiLCJhdWQiOiJ0ZXNpc2luZm9hcGkifQ.6u2Qv1_304l1ZoFJdI3rs61Cmh9Wi1XwnusdDiPh-MA',
  get apiBaseUrl() {
    return `${this.apiLocalUrl}/api/${this.apiVersion}/`;
  },
  get endpointsApiUrl() { return `${this.apiBaseUrl}endpoints/`; },
  get getAllEndpoints() { return `${this.endpointsApiUrl}get_all_endpoints`; },

  get sistemasApiUrl() { return `${this.apiBaseUrl}systems/`; },
  get getAllSistemas() { return `${this.sistemasApiUrl}get_all_systems`; },

  get usuariosApiUrl() { return `${this.apiBaseUrl}users/`; },
  get getAllUsuarios() { return `${this.usuariosApiUrl}get_all_users`; },

  get colasApiUrl() { return `${this.apiBaseUrl}colas/`; },
  get getAllColas() { return `${this.colasApiUrl}get_all_colas`; },

  get plantillaIntegracionApiUrl() { return `${this.apiBaseUrl}integration_templates/`; },
  get getAllPlantillaIntegracion() { return `${this.plantillaIntegracionApiUrl}get_all_integration_templates`; },

  get plantillaDestinoApiUrl() { return `${this.apiBaseUrl}integration_ends/`; },
  get getAllPlantillaDestino() { return `${this.plantillaDestinoApiUrl}get_all_integration_end`; },

  get transformacionCampospiUrl() { return `${this.apiBaseUrl}transformable_fields/`; },
  get getAlltransformacionCampos() { return `${this.transformacionCampospiUrl}get_all_transformable_field`; },

  get transformacionValorespiUrl() { return `${this.apiBaseUrl}transformable_values/`; },
  get getAlltransformacionValores() { return `${this.transformacionValorespiUrl}get_all_transformable_values`; },

  urlSSO: 'https://upaosso.upao.edu.pe:420',
  urlAngular: 'http://localhost:4200/#',
  cryptoIv: '1234567890123456',
  jwtSSOKey: "ZGV2QHRlc2lzQGNsYXZlQHNlY3JldGFAdXBhb0AyMDI1",
  clientAdmi: "dev-upao-tesis-client",
  cryptoKey: '12345678901234561234567890123456',
};
