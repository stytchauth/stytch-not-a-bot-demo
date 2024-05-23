# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=19.9.0
FROM node:${NODE_VERSION}-slim as base


LABEL fly_launch_runtime="Next.js"

# Next.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm i sharp @sentry/cli
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Build application

RUN --mount=type=secret,id=REPLICATE_API_TOKEN \
    --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=HOSTED_URL \
    --mount=type=secret,id=STYTCH_PROJECT_ENV \
    --mount=type=secret,id=STYTCH_PROJECT_ID \
    --mount=type=secret,id=NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN \
    --mount=type=secret,id=STYTCH_SECRET \
    --mount=type=secret,id=TWILIO_ACCOUNT_SID \
    --mount=type=secret,id=TWILIO_AUTH_TOKEN \
    --mount=type=secret,id=IMAGEKIT_PUBLIC_KEY \
    --mount=type=secret,id=IMAGEKIT_PRIVATE_KEY \
    --mount=type=secret,id=IMAGEKIT_URL_ENDPOINT \
    --mount=type=secret,id=SENTRY_AUTH_TOKEN\
    REPLICATE_API_TOKEN="$(cat /run/secrets/REPLICATE_API_TOKEN)" \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" \
    HOSTED_URL="$(cat /run/secrets/HOSTED_URL)" \
    STYTCH_PROJECT_ENV="$(cat /run/secrets/STYTCH_PROJECT_ENV)" \
    STYTCH_PROJECT_ID="$(cat /run/secrets/STYTCH_PROJECT_ID)" \
    NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN="$(cat /run/secrets/NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN)" \
    STYTCH_SECRET="$(cat /run/secrets/STYTCH_SECRET)" \
    TWILIO_ACCOUNT_SID="$(cat /run/secrets/TWILIO_ACCOUNT_SID)" \
    TWILIO_AUTH_TOKEN="$(cat /run/secrets/TWILIO_AUTH_TOKEN)" \
    IMAGEKIT_PUBLIC_KEY="$(cat /run/secrets/IMAGEKIT_PUBLIC_KEY)" \
    IMAGEKIT_PRIVATE_KEY="$(cat /run/secrets/IMAGEKIT_PRIVATE_KEY)" \
    IMAGEKIT_URL_ENDPOINT="$(cat /run/secrets/IMAGEKIT_URL_ENDPOINT)" \
    SENTRY_AUTH_TOKEN="$(cat /run/secrets/SENTRY_AUTH_TOKEN)" \
    npm run build

# Remove development dependencies
RUN npm prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/.next/standalone /app
COPY --from=build /app/.next/static /app/.next/static
COPY --from=build /app/public /app/public

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "server.js" ]
