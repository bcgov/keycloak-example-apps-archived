import { Form, Button, Accordion, Icon } from "semantic-ui-react";
import { useState } from "react";

export default function ClientForm({ keycloak, setCustomConfig }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({});

  const handleClick = (e, { index }) => {
    if (activeIndex !== null) setActiveIndex(null);
    else setActiveIndex(index);
  };

  const clearConfig = () => {
    setCustomConfig(null);
    window.sessionStorage.clear();
    setFormData({});
  };
  
  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e, z) => { 
    window.sessionStorage.setItem('kcConfig', JSON.stringify(formData))
    setCustomConfig(formData);
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
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Auth Server Url</label>
            <Form.Input
              placeholder="e.g https://dev.oidc.gov.bc.ca/auth"
              required
              type="url"
              onChange={handleChange}
              name="authServer"
            />
          </Form.Field>
          <Form.Field>
            <label>Realm</label>
            <Form.Input
              placeholder="Realm"
              required
              onChange={handleChange}
              name="realm"
            />
          </Form.Field>
          <Form.Field>
            <label>Resource</label>
            <Form.Input
              placeholder="aka your client name"
              required
              onChange={handleChange}
              name="resource"
            />
          </Form.Field>
          <Button type="submit">Use This Client</Button>
          <Button type="button" onClick={clearConfig}>
            Use Default Client
          </Button>
        </Form>
      </Accordion.Content>
    </Accordion>
  );
}
