export const environment = {
  production: false,
  apiLocalUrl: 'https://tesis-backend.upao.edu.pe:5001', // cambia según entorno
  apiVersion: 'v1',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmlja25hbWUiOiJzeXMiLCJuYW1lIjoiTWt0T2ZmaWNlIiwibmJmIjoxNzQ1OTQ4NDMzLCJleHAiOjE3NDU5NTIwMzMsImlzcyI6Imh0dHBzOi8vdGVzaXMudXBhby5lZHUucGUiLCJhdWQiOiJ0ZXNpc2luZm9hcGkifQ.6u2Qv1_304l1ZoFJdI3rs61Cmh9Wi1XwnusdDiPh-MA',
  get apiBaseUrl() {
    return `${this.apiLocalUrl}/api/${this.apiVersion}/`;
  },
  get auth() { return `${this.apiBaseUrl}authentication/LOGI/LOG`; },
  
  urlSSO: 'https://upaosso.upao.edu.pe:420',
  urlAngular: 'http://localhost:4200/#',
  cryptoIv: '1234567890123456',
  jwtSSOKey: "ZGV2QHRlc2lzQGNsYXZlQHNlY3JldGFAdXBhb0AyMDI1",
  clientAdmi: "dev-upao-tesis-client",
  cryptoKey: '12345678901234561234567890123456',
};
