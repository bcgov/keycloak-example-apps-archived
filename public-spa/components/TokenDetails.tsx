import type { KeycloakInstance, KeycloakConfig, KeycloakLoginOptions } from 'keycloak-js';
import { useState } from 'react';
import { Table } from 'semantic-ui-react';
import { Menu, Segment } from 'semantic-ui-react';
import { isPlainObject } from 'lodash';

type ActiveItem = 'idToken' | 'idTokenParsed' | 'token' | 'tokenParsed' | 'refreshToken' | 'refreshTokenParsed';

interface ContentProps {
  keycloak: KeycloakInstance;
  activeItem: ActiveItem;
  style: any;
}

const Contents = ({ keycloak, activeItem }: ContentProps) => {
  const input = keycloak[activeItem];

  if (typeof input === 'string') return <Segment className="overflow-wrap">{input}</Segment>;
  if (typeof input === 'object')
    return (
      <>
        <Table celled>
          <Table.Body>
            {Object.entries(input).map(([key, val]: any) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{isPlainObject(val) ? JSON.stringify(val) : val}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  return null;
};

interface Props {
  keycloak: KeycloakInstance;
}

export default function TokenDetails({ keycloak }: Props) {
  const [activeItem, setActiveItem] = useState<ActiveItem>('idToken');
  const handleItemClick = (event: any, { name }: any) => setActiveItem(name);

  return (
    <>
      {keycloak?.authenticated && (
        <>
          <Menu attached="top" tabular>
            <Menu.Item name="idToken" active={activeItem === 'idToken'} onClick={handleItemClick}>
              ID Token Raw{' '}
            </Menu.Item>
            <Menu.Item name="idTokenParsed" active={activeItem === 'idTokenParsed'} onClick={handleItemClick} />
            <Menu.Item name="token" active={activeItem === 'token'} onClick={handleItemClick}>
              Token Raw{' '}
            </Menu.Item>
            <Menu.Item name="tokenParsed" active={activeItem === 'tokenParsed'} onClick={handleItemClick} />
            <Menu.Item name="refreshToken" active={activeItem === 'refreshToken'} onClick={handleItemClick}>
              Refresh Token Raw{' '}
            </Menu.Item>
            <Menu.Item
              name="refreshTokenParsed"
              active={activeItem === 'refreshTokenParsed'}
              onClick={handleItemClick}
            />
          </Menu>
          <Contents keycloak={keycloak} activeItem={activeItem} style={{ maxWidth: '100%' }} />
        </>
      )}
    </>
  );
}
