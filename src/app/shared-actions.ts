"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import loadStytch from "../../lib/loadStytch";

const stytch = loadStytch();

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

  if (!user && !isStytchAdmin(user)) {
    console.log("email", user.emails[0].email);
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
