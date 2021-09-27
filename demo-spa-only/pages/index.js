import { Container, Button, Message } from "semantic-ui-react";
import { useEffect, useState } from "react";
import KeycloakTable from "components/KeycloakTable";

export default function Home() {
  const [auth, setAuth] = useState({ keycloak: {} });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const initKeycloak = async () => {
      let Keycloak = require("keycloak-js");
      const keycloak = Keycloak("/keycloak.json");
      if (window && typeof window !== "object") return;
      keycloak
        .init({
          pkceMethod: "S256",
          redirectUri: "http://localhost:3000",
          idpHint: "idir",
        })
        .then(() => {
          setAuth({ keycloak: keycloak });
          setLoading(false);
        });
    };
    initKeycloak();
  }, []);

  const handleLogin = () => auth.keycloak.login({ idpHint: "idir" });
  const handleLogout = () => auth.keycloak.logout();

  const { keycloak } = auth;

  return (
    <Container>
      <h1>A simple Keycloak Configuration</h1>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleLogout}>Logout</Button>
      {loading ||
        (!keycloak.authenticated && (
          <Message>
            <p>Login to see id token details</p>
          </Message>
        ))}
      {!loading && <KeycloakTable keycloak={keycloak} />}
    </Container>
  );
}
