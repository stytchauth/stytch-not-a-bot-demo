# Stytch not-a-bot Demo

## Overview

This example application demonstrates how one may use Stytch within a Next.js 13 application using the new [App Router](https://nextjs.org/docs/app/building-your-application/routing#the-app-router). If you'd like to see an example of Stytch with Next.js's Page Router, you can find it [here](https://github.com/stytchauth/stytch-nextjs-example).

In Next.js 13's App Router, you may use both [Client](https://nextjs.org/docs/getting-started/react-essentials#client-components) and [Server](https://nextjs.org/docs/getting-started/react-essentials#server-components) components. **This example app primarily uses Client components, however you can see an example of a Server component in `/src/components/Authenticate.js`**. Our [Next.js SDK](https://stytch.com/docs/sdks/javascript-sdk) is compatible with Client components, so anywhere you use it, ensure that you include `'use client'` at the top of the component. If you'd like to use Server components, you may use our [Node Backend SDK](https://www.npmjs.com/package/stytch) to power your authentication flow.

This application features Email Magic Links, Google OAuth, and SMS OTP authentication. You can use this application's source code as a learning resource, or use it as a jumping off point for your own project. We are excited to see what you build with Stytch!

## Set up

Follow the steps below to get this application fully functional and running using your own Stytch credentials.

### In the Stytch Dashboard

1. Create a [Stytch](https://stytch.com/) account. Once your account is set up a Project called "My first project" will be automatically created for you.

2. Within your new Project, navigate to [SDK configuration](https://stytch.com/dashboard/sdk-configuration), and click **Enable SDK**.

3. Navigate to [OAuth](https://stytch.com/dashboard/oauth), and enable login for Google in the Test environment. Config will be done for you automatically in Test.

   <img width="400" alt="OAuth configuration" src="https://user-images.githubusercontent.com/100632220/217055674-a7dafc17-6ad3-492f-8dd2-92560d60dc00.png">

4. Finally, navigate to [API Keys](https://stytch.com/dashboard/api-keys). You will need the `project_id`, `secret`, and `public_token` values found on this page later on.

### On your machine

In your terminal clone the project and install dependencies:

```bash
git clone https://github.com/cal-stytch/stytch-nextjs13-example.git
cd stytch-nextjs13-example
# Install dependencies, using pnpm.
pnpm i
```

Next, create `.env.local` file by running the command below which copies the contents of `.env.template`.

```bash
cp .env.template .env.local
```

Open `.env.local` in the text editor of your choice, and set the environment variables using the `project_id`, `secret`, and `public_token` found on [API Keys](https://stytch.com/dashboard/api-keys). Leave the `STYTCH_PROJECT_ENV` value as `test`.

```
# This is what a completed .env.local file will look like
STYTCH_PROJECT_ENV=test
STYTCH_PROJECT_ID=project-test-00000000-0000-1234-abcd-abcdef1234
NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN=public-token-test-abcd123-0000-0000-abcd-1234567abc
STYTCH_SECRET=secret-test-12345678901234567890abcdabcd
```

## Running locally

After completing all the set up steps above the application can be run with the command:

```bash
npm run dev
```

The application will be available at [`http://localhost:3000`](http://localhost:3000).

You'll be able to login with Email Magic Links, Google OAuth, and see your Stytch User object, Stytch Session, and see how logging out works.

## Get help and join the community

#### :speech_balloon: Stytch community Slack

Join the discussion, ask questions, and suggest new features in our ​[Slack community](https://stytch.slack.com/join/shared_invite/zt-2f0fi1ruu-ub~HGouWRmPARM1MTwPESA)!

#### :question: Need support?

Check out the [Stytch Forum](https://forum.stytch.com/) or email us at [support@stytch.com](mailto:support@stytch.com).
