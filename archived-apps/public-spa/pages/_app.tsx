import '../styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Keycloak from 'keycloak-js';
import type { KeycloakInstance, KeycloakConfig, KeycloakInitOptions, KeycloakLoginOptions } from 'keycloak-js';
import store from 'store2';

const initOptions: KeycloakInitOptions = { pkceMethod: 'S256' };

function MyApp({ Component, pageProps }: AppProps) {
  const [keycloak, setKeycloak] = useState<KeycloakInstance>();
  const [loading, setLoading] = useState(false);

  const [kcConfig, setKcConfig] = useState<KeycloakConfig>(
    store.session('kcConfig') || {
      url: 'https://dev.oidc.gov.bc.ca/auth',
      realm: 'onestopauth',
      clientId: 'sso-requests',
    },
  );

  const [loginOptions, setLginOptions] = useState<KeycloakLoginOptions>(
    store.session('loginOptions') || {
      redirectUri: 'https://bcgov.github.io/keycloak-example-apps',
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
