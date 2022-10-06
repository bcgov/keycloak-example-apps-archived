import Keycloak from 'keycloak-js';

const _kc = new Keycloak({
  url: 'https://dev.loginproxy.gov.bc.ca/auth',
  realm: process.env.REACT_APP_REALM,
  clientId: process.env.REACT_APP_CLIENT_ID,
});

const loginOptions = {
  redirectUri: `https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl=${encodeURIComponent(
    process.env.REACT_APP_URL,
  )}`,
  idpHint: '',
};

export const initializeKeycloak = async () => {
  try {
    const auth = await _kc.init({
      pkceMethod: 'S256',
      checkLoginIframe: false,
      onLoad: 'login-required',
    });

    if (auth) {
      return _kc;
    } else {
      _kc.login(loginOptions);
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => {
  _kc.logout();
};
