"use server";

import { getStytchUser } from "@/src/app/shared-actions";
import * as Sentry from "@sentry/nextjs";
import { getImagesByUserId, getUserCode } from "../db";
import { updateUrlWithPhotoWidth } from "../utils";

export async function getCollageUrlForUser() {
  const user = await getStytchUser();

  let photo;
  try {
    photo = await getUserCode(user.user_id);
  } catch (err) {
    Sentry.captureException(err);
  }

  if (!photo) {
    return undefined;
  }

  return {
    collagePageUrl: `/collage/${photo.id}`,
    collageImageUrl: `/images/collage/${photo.id}`,
  };
}

export async function getPhotosForUser(isMobile: boolean) {
  const user = await getStytchUser();

  let photosRes;
  try {
    photosRes = await getImagesByUserId(user.user_id);
  } catch (err) {
    Sentry.captureException(err);
  }

  if (!photosRes) {
    return [];
  }

  const photos = [
    photosRes.ik_input_image!,
    photosRes.ik_image_0!,
    photosRes.ik_image_1!,
    photosRes.ik_image_2!,
  ];

  const updatedPhotos = photos.map((photo) => {
    return updateUrlWithPhotoWidth(photo, isMobile ? 366 : 732);
  });

  return updatedPhotos;
}
