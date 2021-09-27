import { Table } from "semantic-ui-react";
import { Menu, Segment } from "semantic-ui-react";
import { useState } from "react";

const Contents = ({ keycloak, activeItem }) => {
  const input = keycloak[activeItem];

  if (typeof input === "string")
    return <Segment className="overflow-wrap">{input}</Segment>;
  if (typeof input === "object")
    return (
      <>
        <Table celled>
          <Table.Body>
            {Object.entries(keycloak[activeItem]).map(([key, val]) => (
              <Table.Row>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  return null;
};

export default function KeycloakTable({ keycloak }) {
  const [activeItem, setActiveItem] = useState("idToken");
  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <>
      {keycloak?.authenticated && (
        <>
          <Menu attached="top" tabular>
            <Menu.Item
              name="idToken"
              active={activeItem === "idToken"}
              onClick={handleItemClick}
            >
              ID Token Raw{" "}
            </Menu.Item>
            <Menu.Item
              name="idTokenParsed"
              active={activeItem === "idTokenParsed"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="token"
              active={activeItem === "token"}
              onClick={handleItemClick}
            >
              Token Raw{" "}
            </Menu.Item>
            <Menu.Item
              name="tokenParsed"
              active={activeItem === "tokenParsed"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="refreshToken"
              active={activeItem === "refreshToken"}
              onClick={handleItemClick}
            >
              Refresh Token Raw{" "}
            </Menu.Item>
            <Menu.Item
              name="refreshTokenParsed"
              active={activeItem === "refreshTokenParsed"}
              onClick={handleItemClick}
            />
          </Menu>
          <Contents
            keycloak={keycloak}
            activeItem={activeItem}
            style={{ maxWidth: "100%" }}
          />
        </>
      )}
    </>
  );
}
