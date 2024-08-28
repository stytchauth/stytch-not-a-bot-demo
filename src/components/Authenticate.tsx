"use client";

import { useStytch, useStytchUser } from "@stytch/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { redirectToProfileOrGetCode } from "../app/utils";

const OAUTH_TOKEN = "oauth";
const MAGIC_LINKS_TOKEN = "magic_links";

/**
 * During both the Magic link and OAuth flows, Stytch will redirect the user back to your application to a specified redirect URL (see Login.tsx).
 * Stytch will append query parameters to the redirect URL which are then used to complete the authentication flow.
 * A redirect URL for this example app will look something like: http://localhost:3000/authenticate?stytch_token_type=magic_links&token=abc123
 *
 * The AuthenticatePage will detect the presence of a token in the query parameters, and attempt to authenticate it.
 *
 * On successful authentication, a session will be created and the user will be redirect to /profile.
 */
const Authenticate = () => {
  const { user, isInitialized } = useStytchUser();
  const stytch = useStytch();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (stytch && !user && isInitialized) {
      const token = searchParams.get("token");
      const stytch_token_type = searchParams.get("stytch_token_type");

      if (token && stytch_token_type === OAUTH_TOKEN) {
        stytch.oauth.authenticate(token, {
          session_duration_minutes: 60,
        });
      } else if (token && stytch_token_type === MAGIC_LINKS_TOKEN) {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });
      }
    }
  }, [isInitialized, router, searchParams, stytch, user]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    // Redirect to the appropriate page based on the user's state using trusted_metadata
    // /profile if the user is associated with a photo
    // /get-code if the user is not yet associated with a photo
    if (user) {
      redirectToProfileOrGetCode(isInitialized, user, router);
    }
  }, [router, user, isInitialized]);

  return null;
};

export default Authenticate;
