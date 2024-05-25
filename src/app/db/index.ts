import { neon } from "@neondatabase/serverless";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { NewPhoto, Photo, photos } from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be a Neon postgres connection string");
}

export type ImageKitImage = {
  fileId: string;
  url: string;
};

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, {
  schema: { photos },
});

export async function addPhoto(photo: NewPhoto): Promise<Photo> {
  const result = await db.insert(photos).values(photo).returning();

  return result.at(0)!;
}

export async function updateImages(
  photoId: Photo["id"],
  image_0: Photo["image_0"],
  image_1: Photo["image_1"],
  image_2: Photo["image_2"],
) {
  const result = await db
    .update(photos)
    .set({ image_0, image_1, image_2 })
    .where(eq(photos.id, photoId))
    .returning();

  return result.at(0)!;
}

export async function addAIImage(
  photoId: Photo["id"],
  imageField: Photo["image_0"] | Photo["image_1"] | Photo["image_2"],
  imageUrl: string,
) {
  const result = await db
    .update(photos)
    .set({ [imageField!]: imageUrl })
    .where(eq(photos.id, photoId))
    .returning();

  return result.at(0)!;
}

export async function addImageKitInputImage(
  photoId: Photo["id"],
  ikImg: ImageKitImage,
) {
  await db
    .update(photos)
    .set({ ik_input_image_id: ikImg.fileId, ik_input_image: ikImg.url })
    .where(eq(photos.id, photoId));
}

export async function addUserToPhoto(
  photoId: Photo["id"],
  userId: Photo["user_id"],
) {
  await db
    .update(photos)
    .set({ user_id: userId })
    .where(eq(photos.id, photoId));
}

export async function addImageKitImage(
  photoId: Photo["id"],
  imageField: Photo["image_0"] | Photo["image_1"] | Photo["image_2"],
  ikImage: ImageKitImage,
) {
  await db
    .update(photos)
    .set({
      [`ik_${imageField}_id`]: ikImage.fileId,
      [`ik_${imageField}`]: ikImage.url,
    })
    .where(eq(photos.id, photoId));
}

export async function addImageKitImages(
  photoId: Photo["id"],
  ikImages: ImageKitImage[],
) {
  ikImages.forEach(async (ikImage, i) => {
    await db
      .update(photos)
      .set({
        [`ik_image_${i}_id`]: ikImage.fileId,
        [`ik_image_${i}`]: ikImage.url,
      })
      .where(eq(photos.id, photoId));
  });
}

export async function getImagesByPhotoId(photoId: Photo["id"]): Promise<Photo> {
  const result = await db.select().from(photos).where(eq(photos.id, photoId));

  return result.at(0)!;
}

export async function getImagesByUserId(
  userId: Photo["user_id"],
): Promise<Photo> {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const result = await db
    .select()
    .from(photos)
    .where(eq(photos.user_id, userId));

  return result.at(0)!;
}

export async function getAllPhotos(limit: number = 200): Promise<Photo[]> {
  const result = await db
    .select()
    .from(photos)
    .orderBy(desc(photos.created_at))
    .limit(limit);

  return result;
}

export async function getUserCode(userId: Photo["user_id"]): Promise<Photo> {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const result = await db
    .select()
    .from(photos)
    .where(eq(photos.user_id, userId));

  return result.at(0)!;
}

export async function deletePhoto(photoId: Photo["id"]) {
  await db.delete(photos).where(eq(photos.id, photoId));
}
