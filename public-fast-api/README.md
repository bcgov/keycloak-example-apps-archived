### public-fastAPI

An example python API written in fastAPI, with a vuejs SPA frontend. The fastAPI backend
uses [pyjwt](https://pyjwt.readthedocs.io/en/latest/) as an example of fetching the
json web key from the `.well-known` endpoint and using it to verify a tokens signature.

To run this example, you will need a public keycloak client you can use. If you have generated one with
our self-service [webapp](https://bcgov.github.io/sso-requests/), copy the
installation json you receive into `services/frontend/public/keycloak.json`. To run locally
ensure that your client allows `http://localhost:3000` as a valid
redirect URI. Then from `examples/nextjs-example`:

- **Run**: `docker-compose up`

Visit `localhost:3000` on your machine to test it out.
