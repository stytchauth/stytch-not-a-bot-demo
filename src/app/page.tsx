"use client";

import Login from "@/src/components/Login";
import { useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { redirectToProfileOrGetCode } from "./utils";

export default function LoginPage() {
  const { user, isInitialized } = useStytchUser();
  const router = useRouter();

  // If the Stytch SDK detects a User then redirect; for example if a logged in User navigated directly to this URL.
  // Redirect to the appropriate page based on the user's state using trusted_metadata
  // /profile if the user is associated with a photo
  // /get-code if the user is not yet associated with a photo
  useEffect(() => {
    redirectToProfileOrGetCode(isInitialized, user, router);
  }, [user, isInitialized, router]);

  return (
    <main className="flex min-h-screen bg-charcoal text-white">
      <div className="w-96 m-auto max-w-2xl">
        <Login />
      </div>
    </main>
  );
}
