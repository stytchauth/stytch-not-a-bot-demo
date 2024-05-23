import * as Sentry from "@sentry/nextjs";
import { get } from "lodash";
import { getImagesByPhotoId } from "../../db";

export async function POST(req: Request) {
  const result = await req.json();
  console.log("Received", result);

  let photosRes;
  try {
    photosRes = await getImagesByPhotoId(get(result, "code"));
    console.log("Photos", photosRes);
  } catch (err) {
    Sentry.captureException(err);
    return new Response("Error", { status: 500 });
  }

  const photos = [
    photosRes.ik_input_image,
    photosRes.ik_image_0,
    photosRes.ik_image_1,
    photosRes.ik_image_2,
  ];

  return new Response(JSON.stringify({ photos }), { status: 200 });
}
