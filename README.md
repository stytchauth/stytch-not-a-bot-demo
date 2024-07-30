# Stytch not-a-bot B2C Demo App

## Overview

This is a demo application that uses Stytch to authenticate users and generate bot photos using AI to demonstrate the capabilities of Stytch in a real-world application. The application uses Stytch's Email Magic Links and Google OAuth to authenticate users. Once authenticated, users can access the application and see their generated photos, download and share on social media or print.

The application is built with Next.js 13, Tailwind CSS, and TypeScript. It uses Stytch's JavaScript SDK to authenticate users and manage sessions.

The application flow:

1. An app admin messages a photo to a Twilio number set up to receive MMS messages and call the `/api/getAIPhotos` endpoint.
2. The `/api/getAIPhotos` endpoint calls the Replicate API to generate bot photos and the ImageKit API to store and serve images and replies with a "photo code" to be used after signup to associate a user with a photo.
3. Users can sign up or log in with Email Magic Links or Google OAuth by visiting the deployed application at https://stytch-not-a-bot.com
4. After signing up or logging in, users can enter the "photo code" they received to see their generated photos.
5. Users can download, share on social media, or print their generated collage of photos.

[Twilio](https://www.twilio.com/) is used to receive MMS messages and call the `/api/getAIPhotos` endpoint. [Replicate](https://replicate.com) hosts the [TencentARC/PhotoMaker](https://github.com/TencentARC/PhotoMaker) model to generate bot photos a photo and a prompt. [ImageKit](https://imagekit.io) is used to store and serve images as well as dynamically assemble the collage. [Sentry](https://sentry.io) is used for error tracking. The application is deployed on [Fly.io](https://fly.io). [Neon](https://neon.tech) is used as a Serverless Postgres database for storing data for the application. [Ngrok](https://ngrok.com) is used for local development and testing.

## Twilio

Visit [Twilio](https://www.twilio.com/) and create an account. You will need to set up a Twilio phone number to receive MMS messages. You will also need your Twilio Account SID and Auth Token and update the `.env.local` file with these values:

```
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
```

## Replicate and tencentarch/photomaker model

Visit [Replicate](https://replicate.com) and create an account. Find the API token in your account settings and update the `.env.local` file with this value:

```
REPLICATE_API_TOKEN=
```

## Neon

Visit [Neon](https://neon.tech) and create an account. You will need to create a database and get the database URL and update the `.env.local` file with this value:

```
DATABASE_URL=
```

## ImageKit

Visit [ImageKit](https://imagekit.io) and create an account. You will need to get your public key, private key, and URL endpoint and update the `.env.local` file with these values:

```
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

## Sentry

Visit [Sentry](https://sentry.io) and create an account. You will need to get your DSN and Auth Token and update the `.env.local` file with these values:

```
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

## Ngrok

Visit [Ngrok](https://ngrok.com) and create an account. You will need to get your Ngrok host and update the `.env.local` file with this value:

```
NGROK_HOST=
```

## Deployment on Fly.io

Visit [Fly.io](https://fly.io) and create an account. You will need to get your Fly.io API token and update the `.env.local` file with this value:

```
HOSTED_URL=
```

Install the Fly CLI:

```bash
curl -L https://fly.io/install.sh | sh
```

Launch the app on Fly:

```bash
fly launch
```

Import secrets to Fly from `.env.local`:

```bash
fly secrets import < .env.local
```

Deploy the app:

```bash
npm run fly:deploy
```

### Next.js 13 App Router

This example application demonstrates a real-world application using several services including Stytch within a Next.js 13 application using the new [App Router](https://nextjs.org/docs/app/building-your-application/routing#the-app-router). If you'd like to see an example of Stytch with Next.js's Page Router, you can find it [here](https://github.com/stytchauth/stytch-nextjs-example).

In Next.js 13's App Router, you may use both [Client](https://nextjs.org/docs/getting-started/react-essentials#client-components) and [Server](https://nextjs.org/docs/getting-started/react-essentials#server-components) components. **This example app primarily uses Client components, however you can see an example of a Server component in `/src/components/Authenticate.js`**. Our [Next.js SDK](https://stytch.com/docs/sdks/javascript-sdk) is compatible with Client components, so anywhere you use it, ensure that you include `'use client'` at the top of the component. If you'd like to use Server components, you may use our [Node Backend SDK](https://www.npmjs.com/package/stytch) to power your authentication flow.

This application features Email Magic Links and Google OAuth. You can use this application's source code as a learning resource, or use it as a jumping off point for your own project. We are excited to see what you build with Stytch!

## Stytch Setup

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
git clone https://github.com/stytch/stytch-not-a-bot-demo.git
cd stytch-not-a-bot-demo
# Install dependencies, using npm.
npm i
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

Join the discussion, ask questions, and suggest new features in our ​[Slack community](https://stytch.com/docs/resources/support/overview)!

#### :question: Need support?

Check out the [Stytch Forum](https://forum.stytch.com/) or email us at [support@stytch.com](mailto:support@stytch.com).
