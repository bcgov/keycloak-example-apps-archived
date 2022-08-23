const BASE_PATH = process.env.APP_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  basePath: BASE_PATH,
  publicRuntimeConfig: {
    HOSTNAME: process.env.HOST || '0.0.0.0',
    PORT: process.env.PORT || 3000,
    OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID || '',
    OIDC_AUTHORIZATION_URL: `${process.env.CSS_DOMAIN_NAME_URL}` || '',
    OIDC_REALM_TYPE: `${process.env.OIDC_REALM_TYPE}` || '',
    OIDC_REDIRECT_URL: process.env.OIDC_REDIRECT_URL || '',
    OIDC_LOGOUT_REDIRECT_URL: process.env.OIDC_LOGOUT_REDIRECT_URL || '',
  },
};

module.exports = nextConfig;
