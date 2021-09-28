import { Form, Button, Accordion, Icon } from "semantic-ui-react";
import { useState } from "react";

export default function ClientForm({ keycloak, setCustomConfig, setAdapterConfig, adapterConfig }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [formAdapterConfig, setFormAdapterConfig] = useState(adapterConfig)

  const handleClick = (e, { index }) => {
    if (index === activeIndex) setActiveIndex(null)
    else setActiveIndex(index);
  };

  const clearConfig = () => {
    setCustomConfig(null);
    window.sessionStorage.clear();
    setFormData({});
  };
  
  const handleClientChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleClientSubmit = () => { 
    window.sessionStorage.setItem('kcConfig', JSON.stringify(formData))
    setCustomConfig(formData);
  }
  
  const handleAdapterChange = (e, { name, value }) => {
    setFormAdapterConfig({ ...adapterConfig, [name]: value });
  };
  
  const handleAdapterSubmit = () => { 
    window.sessionStorage.setItem('adapterConfig', JSON.stringify(formAdapterConfig))
    console.log(formAdapterConfig)
    setAdapterConfig(formAdapterConfig);
  }

  return (
    <Accordion styled>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        Set My Own Client
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <Form onSubmit={handleClientSubmit}>
          <Form.Field>
            <label>Auth Server Url</label>
            <Form.Input
              placeholder="e.g https://dev.oidc.gov.bc.ca/auth"
              required
              type="url"
              onChange={handleClientChange}
              name="authServer"
            />
          </Form.Field>
          <Form.Field>
            <label>Realm</label>
            <Form.Input
              placeholder="Realm"
              required
              onChange={handleClientChange}
              name="realm"
            />
          </Form.Field>
          <Form.Field>
            <label>Resource</label>
            <Form.Input
              placeholder="aka your client name"
              required
              onChange={handleClientChange}
              name="resource"
            />
          </Form.Field>
          <Button type="submit">Use This Client</Button>
          <Button type="button" onClick={clearConfig}>
            Use Default Client
          </Button>
        </Form>
      </Accordion.Content>
      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        Change My Adapter Config
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        <Form onSubmit={handleAdapterSubmit}>
          <Form.Field>
            <label>IDP Hint</label>
            <Form.Input
              placeholder="e.g idir"
              onChange={handleAdapterChange}
              name="idpHint"
              defaultValue={adapterConfig?.idpHint}

            />
          </Form.Field>
          <Form.Field>
            <label>Redirect URI</label>
            <Form.Input
              placeholder="e.g idir"
              required
              type="url"
              onChange={handleAdapterChange}
              name="redirectUri"
              defaultValue={adapterConfig?.redirectUri}

            />
          </Form.Field>
          <Form.Field>
            <label>PKCE Method</label>
            <Form.Input
              placeholder="e.g idir"
              required
              onChange={handleAdapterChange}
              name="PKCEMethod"
              defaultValue={adapterConfig?.pkceMethod}
            />
          </Form.Field>
          <Button type="submit">Use This Adapter Config</Button>
        </Form>
      </Accordion.Content>
    </Accordion>
  );
}
