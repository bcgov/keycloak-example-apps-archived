This repository contains client applications that can be used to test an integratin provided by the BC Gov CSS App

## Next-App

An example [Next.js](https://nextjs.org/) application to connect to CSS App client without 3rd party library or wrapper.back end?

- located in [examples/next-app](examples/next-app) directory.

### How to run

- Local development environment w/o Docker

1. Go to `examples/next-app`.
1. Copy `.env.example` to `.env.local`,
1. Set environment variables in `.env.local`.
1. Run the development server:

```sh
    yarn install
    yarn dev
```

- Docker based local development environment

1. Go to `examples/next-app`
1. Copy `.env.example` to `.env`,
1. Set environment variables in `.env`.
1. Build the `docker image`: 

```sh
    docker build -t next-app-example .
```
1. Run the `docker-compose` file:

```sh
    docker-compose up
```

- Docker Compose sources environment variables from a `.env` file located next to the docker-compose.yml file.


# Known issues
1. env.example should not refer to cognito but this requires looking at the parts of the code to change
1. the codebase should not have any hard coded URLs ie fix cognito.js
1. readme should place instructions on what is used from the json installation file and well known end points

