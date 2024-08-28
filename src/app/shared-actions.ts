"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import loadStytch from "../../lib/loadStytch";

const stytch = loadStytch();

const STYTCH_SECRET = process.env.STYTCH_SECRET;
const STYTCH_PROJECT_ID = process.env.STYTCH_PROJECT_ID;

export async function getStytchUser() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("stytch_session");

  let session;
  try {
    session = await stytch.sessions.authenticate({
      session_token: sessionCookie?.value,
    });
  } catch (error) {
    // log error
  }

  if (!session) {
    redirect("/");
  }

  return session.user;
}

export async function getStytchAdminUser() {
  const user = await getStytchUser();

  if (!user || !isStytchAdmin(user)) {
    redirect("/");
  }

  return user;
}

function isStytchAdmin(user: any) {
  return user.emails[0].email.includes("@stytch.com");
}

export async function updateStytchTrustedMetadata(
  key: string,
  value: string | boolean,
  user_id: string,
) {
  await stytch.users.update({
    user_id,
    trusted_metadata: {
      [key]: value,
    },
  });
}

export const stytchFingerprintLookup = async ({
  telemetry_id,
}: {
  telemetry_id: string;
}) => {
  let response;
  try {
    response = await fetch(
      `https://telemetry.stytch.com/v1/fingerprint/lookup?telemetry_id=${telemetry_id}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Basic " + btoa(`${STYTCH_PROJECT_ID}:${STYTCH_SECRET}`),
        },
      },
    );
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }

  const data = await response.json();
  const { verdict } = data;
  return { verdictAction: verdict.action };
};
