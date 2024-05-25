"use server";

import { redirect } from "next/navigation";
import { deletePhoto } from "../db";

export async function adminDeletePhotoAction(photoId: string) {
  await deletePhoto(photoId);
  redirect("/admin");
}
