## Pre-req

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

1. Create a project `public-spa` with Next js https://github.com/vercel/next.js/tree/canary/packages/create-next-app

```sh
npx create-next-app@latest
# or
yarn create next-app
# or
pnpm create next-app
```

1. Run the development server to make sure you are up and running:

```bash
npm run dev
# or
yarn dev
```

## Steps to apply CSS Installation Json

1. Copy the missing/different files from here into your NextjS project

```sh
cp -a path_to_source/. path_to_destination/
```

2. Add the relevant keycloak config around line 15 of pages/\_app.tsx
3. make sure your dev server is running. you if you used npx create-next-app@latest, you may have to install the latest node

```sh

npm install next@latest

```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

3. Modify/edit `pages/index.tsx` - this page auto-updates as you edit the file.

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
