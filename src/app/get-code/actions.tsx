"use server";

import * as Sentry from "@sentry/nextjs";
import { redirect } from "next/navigation";
import { addUserToPhoto } from "../db";
import { getStytchUser, updateStytchTrustedMetadata } from "../shared-actions";

export type FormState = {
  code: string;
  errors: {
    code: string | undefined;
  };
};

export async function saveUserToPhotoAction(
  previousState: FormState,
  formData: FormData,
) {
  const user = await getStytchUser();

  const code = formData.get("code") as string;

  if (!code) {
    return {
      code,
      errors: {
        code: "Code must be defined",
      },
    };
  }

  try {
    await addUserToPhoto(code, user.user_id);
    await updateStytchTrustedMetadata("hasAIImage", true, user.user_id);
  } catch (err) {
    Sentry.captureException(err);
  }

  redirect("/profile");
}
