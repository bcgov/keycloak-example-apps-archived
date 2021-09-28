import { Container, Button, Message } from "semantic-ui-react";
import KeycloakTable from "components/KeycloakTable";
import ClientForm from "components/ClientForm";

export default function Home({
  loading,
  keycloak,
  setCustomConfig,
  adapterConfig,
  setAdapterConfig,
}) {
  const handleLogin = () => {
    keycloak?.login(adapterConfig);
  };
  const handleLogout = () => keycloak?.logout();

  return (
    <Container>
      <br />
      <h1>Keycloak Playground</h1>
      <p>
        This is a playground application for using the <code>keycloak-js</code>{" "}
        adapter. Click the <strong>Login</strong> button below to login with the
        default client (uses IDIR as an IDP) and see your different token
        details. If you have your own public client, you can use the form below
        (Click on <strong>Set My Own Client</strong>) to authenticate to your
        own client.
      </p>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleLogout}>Logout</Button>
      <br />
      <br />
      <ClientForm
        setCustomConfig={setCustomConfig}
        adapterConfig={adapterConfig}
        setAdapterConfig={setAdapterConfig}
      />
      <br />
      {loading ||
        (!keycloak?.authenticated && (
          <Message>
            <p>Login to see id token details</p>
          </Message>
        ))}
      {!loading && <KeycloakTable keycloak={keycloak} />}
    </Container>
  );
}
