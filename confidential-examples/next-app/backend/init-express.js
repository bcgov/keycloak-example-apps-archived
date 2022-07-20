const axios = require('axios');
const qs = require('qs');

const {
  CSS_CLIENT_ID,
  CSS_CLIENT_SECRET,
  CSS_DOMAIN_NAME_URL,
  CSS_LOGIN_GRANT_TYPE,
  CSS_LOGIN_REDIRECT_URL,
  CSS_LOGIN_RESPONSE_TYPE,
  CSS_LOGIN_SCOPE,
  CSS_LOGOUT_REDIRECT_URL,
} = require('./config');

const btoa = (string) => Buffer.from(string).toString('base64');

const decodeValue = (base64String) => {
  try {
    return JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));
  } catch {
    return '';
  }
};

const decodingJWT = (token) => {
  if (!token) return null;

  const [header, payload] = token.split('.');
  console.log('header', header);

  return {
    header: decodeValue(header),
    payload: decodeValue(payload),
  };
};

// see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1
const getAuthorizationUrl = async ({ identity_provider } = {}) => {

  const params = {
    client_id: CSS_CLIENT_ID,
    response_type: CSS_LOGIN_RESPONSE_TYPE,
    scope: CSS_LOGIN_SCOPE,
    redirect_uri: CSS_LOGIN_REDIRECT_URL,
  };

  // Give an option to select an identity provider.
  if (identity_provider) {
    params.identity_provider = identity_provider;
  }

  return `${CSS_DOMAIN_NAME_URL}/auth?${qs.stringify(params, { encode: false })}`;
  
};

// see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
const getAccessToken = async ({ code }) => {
  const url = `${CSS_DOMAIN_NAME_URL}/token`;
  console.log("---------URL---",url);
  const params = {
    grant_type: CSS_LOGIN_GRANT_TYPE,
    client_id: CSS_CLIENT_ID,
    redirect_uri: CSS_LOGIN_REDIRECT_URL,
    code,
  };
  
  const config = {
    url,
    method: 'post',
    data: qs.stringify(params),
  };
  if (CSS_CLIENT_SECRET) {
    config.headers = { Authorization: `Basic ${btoa(`${CSS_CLIENT_ID}:${CSS_CLIENT_SECRET}`)}` };
  }

  const { data } = await axios(config);

  const { id_token, access_token, refresh_token } = data;
  
  // Decode tokens to get user information
  data.id_token_decoded = decodingJWT(id_token);
  
  data.access_token_decoded = decodingJWT(access_token);

  data.refresh_token_decoded = decodingJWT(refresh_token);

  return data;
};

const getUserInfo = async ({ accessToken }) => {
  const url = `${CSS_DOMAIN_NAME_URL}/userinfo`;
  const { data } = await axios({
    url,
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

const getLogoutUrl = () => {
  const params = {
    client_id: CSS_CLIENT_ID,
    redirect_uri: CSS_LOGOUT_REDIRECT_URL,
  };

  return `${CSS_DOMAIN_NAME_URL}/logout?${qs.stringify(params, { encode: false })}`;
};

module.exports = { getAuthorizationUrl, getAccessToken, getUserInfo, getLogoutUrl };
