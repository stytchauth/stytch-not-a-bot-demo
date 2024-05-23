import * as Sentry from "@sentry/nextjs";
import ImageKit from "imagekit";
import { addAIImage, addImageKitImage } from "../../db";
import { genImageKitFolder } from "../../utils";

let imagekit: ImageKit;
try {
  imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
  });
} catch (err) {
  Sentry.captureException(err);
}

export async function POST(req: Request) {
  const result = await req.json();
  const slug = getQSParamFromURL("s", req.url);
  const imageField = getQSParamFromURL("i", req.url);
  const ikFolder = genImageKitFolder(slug);

  console.log("Received webhook", result);
  console.log("slug", slug);
  console.log("imageField", slug);

  if (!slug) {
    Sentry.captureException("Error: ID not found", result);
    return new Response("Error: ID not found", { status: 400 });
  }

  let photoRecord;
  try {
    photoRecord = await addAIImage(slug, imageField, result.output[0]);
  } catch (err) {
    Sentry.captureException(err);
    return new Response("Error", { status: 500 });
  }

  let img;
  try {
    img = await imagekit.upload({
      file: result.output[0],
      fileName: `${imageField}.png`,
      useUniqueFileName: false,
      folder: ikFolder,
    });
  } catch (error) {
    console.log(`ik image - error`, error);
  }

  if (!img) {
    Sentry.captureException("Error: Image not found", result);
    return new Response("Error: Image not found", { status: 400 });
  }

  await addImageKitImage(slug, imageField, img);

  return new Response(`Generated Photos for ${slug}`, { status: 200 });
}

function getQSParamFromURL(
  key: string,
  url: string | undefined,
): string | null {
  if (!url) return "";
  const search = new URL(url).search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(key);
}
