import '../styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Keycloak from 'keycloak-js';
import type { KeycloakInstance, KeycloakConfig, KeycloakInitOptions, KeycloakLoginOptions } from 'keycloak-js';
import store from 'store2';
import getConfig from 'next/config';

const { publicRuntimeConfig = {} } = getConfig() || {};
const { OIDC_CLIENT_ID, OIDC_AUTHORIZATION_URL, OIDC_REALM_TYPE, OIDC_REDIRECT_URL } = publicRuntimeConfig;

const initOptions: KeycloakInitOptions = { pkceMethod: 'S256' };

function MyApp({ Component, pageProps }: AppProps) {
  const [keycloak, setKeycloak] = useState<KeycloakInstance>();
  const [loading, setLoading] = useState(false);

  const [kcConfig, setKcConfig] = useState<KeycloakConfig>(
    store.session('kcConfig') || {
      url: OIDC_AUTHORIZATION_URL,
      realm: OIDC_REALM_TYPE,
      clientId: OIDC_CLIENT_ID,
    },
  );

  const [loginOptions, setLginOptions] = useState<KeycloakLoginOptions>(
    store.session('loginOptions') || {
      redirectUri: OIDC_REDIRECT_URL,
      idpHint: '',
    },
  );

  useEffect(() => {
    setLoading(true);

    const initKeycloak = async () => {
      const _keycloak = new (Keycloak as any)(kcConfig);
      setKeycloak(_keycloak);

      setLoading(true);
      _keycloak
        .init(initOptions)
        .then(() => {
          setLoading(false);
        })
        .catch((error: any) => {
          console.log('Error in init: ', error);
          setLoading(false);
        });
    };
    initKeycloak();
  }, [kcConfig]);

  return (
    <Component
      {...pageProps}
      keycloak={keycloak}
      kcConfig={kcConfig}
      setKcConfig={setKcConfig}
      loginOptions={loginOptions}
      setLginOptions={setLginOptions}
    />
  );
}

export default MyApp;
