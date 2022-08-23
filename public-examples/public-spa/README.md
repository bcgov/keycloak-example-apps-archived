## background
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Creating a Keycloak integration

Before running the app locally, you will need a keycloak integration.

To use a standard keycloak realm goto the [CSS APP](https://bcgov.github.io/sso-requests) and create an integration. 

During the integration creation flow you will be prompted for the inputs needed for your project. For this example project you will need a `Public` client type generated in the `Development` environment. 

This project also requires `http://localhost:3000` as a `Redirect URI`.

## How to run

1. Go to `keycloak-example-apps/public-spa`,
2. Copy `.env.example` to `.env`,
3. Set environment variables in `.env`,
4. Run the development server:

```sh
    npm install
    npm run dev
```

5. Browse to http://localhost:3000 to see this Keycloak OIDC Playground app.


## Additional Notes
Modify/edit `pages/index.tsx` - this page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.