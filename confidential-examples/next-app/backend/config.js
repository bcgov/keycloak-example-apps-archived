require('dotenv').config({ path: __dirname + '/../.env.local' });

module.exports = {
  HOSTNAME: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 3000,
  CSS_CLIENT_ID: process.env.CSS_CLIENT_ID || '',
  CSS_CLIENT_SECRET: process.env.CSS_CLIENT_SECRET || '',
  CSS_DOMAIN_NAME_URL: process.env.CSS_DOMAIN_NAME_URL || '',
  CSS_LOGIN_GRANT_TYPE: process.env.CSS_LOGIN_GRANT_TYPE || '',
  CSS_LOGIN_REDIRECT_URL: process.env.CSS_LOGIN_REDIRECT_URL || '',
  CSS_LOGIN_RESPONSE_TYPE: process.env.CSS_LOGIN_RESPONSE_TYPE || '',
  CSS_LOGIN_SCOPE: process.env.CSS_LOGIN_SCOPE || '',
  CSS_LOGOUT_REDIRECT_URL: process.env.CSS_LOGOUT_REDIRECT_URL || '',
  COOKIE_SESSION_NAME: process.env.COOKIE_SESSION_NAME || '',
  COOKIE_SESSION_SECRET: process.env.COOKIE_SESSION_SECRET || 'verysecuresecret',
};
