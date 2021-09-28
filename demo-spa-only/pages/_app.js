import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { useEffect, useState } from "react";
const BASE_PATH = "/keycloak-example-apps";

const getKeycloakConfig = (customConfig) => {
  try {
    if (customConfig) {
      const { authServer, realm, resource } = customConfig;
      return {
        url: authServer,
        realm,
        clientId: resource,
      };
    } else {
      const storageConfig = JSON.parse(
        window.sessionStorage.getItem("kcConfig")
      );
      const { authServer, realm, resource } = storageConfig;
      return {
        url: authServer,
        realm,
        clientId: resource,
      };
    }
  } catch (e) {
    console.error(e);
  }
};

function MyApp({ Component, pageProps }) {
  const [keycloak, setKeycloak] = useState({});
  const [loading, setLoading] = useState(false);
  const [customConfig, setCustomConfig] = useState(null);
  const [adapterConfig, setAdapterConfig] = useState({
    pkceMethod: "S256",
    redirectUri: "https://bcgov.github.io/keycloak-example-apps/",
    idpHint: "idir",
  });

  if (typeof window === 'object' && window.sessionStorage.getItem('adapterConfig')) {
    try {
      const savedAdapterConfig = JSON.parse(window.sessionStorage.getItem('adapterConfig'));
      if (JSON.stringify(adapterConfig) !== JSON.stringify(savedAdapterConfig))
        setAdapterConfig(savedAdapterConfig);
    } catch (e) {
      console.error('failed to parse saved config :(')
    }
  }

  useEffect(() => {
    setLoading(true);
    let Keycloak = require("keycloak-js");
    let keycloak;
    if (customConfig ||(typeof window === 'object' && window.sessionStorage.getItem("kcConfig"))) {
      const config = getKeycloakConfig(customConfig);
      keycloak = new Keycloak(config);
    } else {
      keycloak = Keycloak(`${BASE_PATH}/keycloak.json`);
    }
    const initKeycloak = async () => {
      if (window && typeof window !== "object") return;
      keycloak
        .init(adapterConfig)
        .then(() => {
          setKeycloak(keycloak);
          setLoading(false);
        });
    };
    initKeycloak();
  }, [customConfig, adapterConfig]);

  return (
    <Component
      {...pageProps}
      loading={loading}
      keycloak={keycloak}
      setCustomConfig={setCustomConfig}
      adapterConfig={adapterConfig}
      setAdapterConfig={setAdapterConfig}
    />
  );
}

export default MyApp;
