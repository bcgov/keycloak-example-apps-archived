import { Table } from "semantic-ui-react";

export default function KeycloakTable({keycloak }) {
  return (
    <>
      {keycloak.authenticated && (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='2'>ID Token Details</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {keycloak.idTokenParsed &&
              Object.entries(keycloak.idTokenParsed).map(([key, val]) => (
                <Table.Row>
                  <Table.Cell>{key}</Table.Cell>
                  <Table.Cell>{val}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
}
