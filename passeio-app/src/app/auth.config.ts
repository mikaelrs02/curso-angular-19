import { AuthConfig } from "angular-oauth2-oidc";

export const auth: AuthConfig = {
  issuer: 'https://passeio-app-identity-server.azurewebsites.net',
  redirectUri: window.location.origin,
  clientId: '751140547580-lk08v3is6a98oa5l120vmddbkrioict2.apps.googleusercontent.com',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false
}
