import * as Sentry from "@sentry/nextjs";
import ImageKit from "imagekit";
import Replicate, { WebhookEventType } from "replicate";
import { addImageKitInputImage, addPhoto } from "../../db";
import { genImageKitFolder, generatePrompt, getSlug } from "../../utils";

const WEBHOOK_HOST = process.env.HOSTED_URL
  ? process.env.HOSTED_URL
  : process.env.NGROK_HOST;

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

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

const replicateModelVersion =
  "ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4";

export async function POST(req: Request) {
  const data = await req.formData();
  const inputImage = data.get("MediaUrl0");
  const messageSid = data.get("MessageSid") as string;

  if (!inputImage || !messageSid) {
    return new Response("Error", { status: 400 });
  }

  const slug = getSlug(messageSid);
  const ikFolder = genImageKitFolder(slug);

  try {
    await addPhoto({
      id: slug as string,
      input_image: inputImage as string,
      message_sid: messageSid as string,
    });
  } catch (error) {
    console.log("addPhoto - error", error);
  }

  try {
    await imagekit.createFolder({
      folderName: slug,
      parentFolderPath: "not-a-bot",
    });
  } catch (error) {
    console.log("imagekit - error", error);
  }

  try {
    const img = await imagekit.upload({
      file: inputImage as string,
      fileName: "input_image.jpg",
      useUniqueFileName: false,
      folder: ikFolder,
    });

    addImageKitInputImage(slug, img);
  } catch (error) {
    console.log("input image - error", error);
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.",
    );
  }

  const genReplicatePayload = (dbImgField: string) => ({
    version: replicateModelVersion,
    input: {
      prompt: generatePrompt(),
      num_steps: 50,
      style_name: "Photographic (Default)",
      input_image: inputImage,
      num_outputs: 1,
      guidance_scale: 5,
      negative_prompt:
        "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
      style_strength_ratio: 20,
    },
    webhook: `${WEBHOOK_HOST}/api/genAIPhotos-webhook?s=${slug}&i=${dbImgField}`,
    webhook_events_filter: ["completed"] as WebhookEventType[],
  });

  try {
    const predictions = await Promise.all([
      replicate.predictions.create(genReplicatePayload("image_0")),
      replicate.predictions.create(genReplicatePayload("image_1")),
      replicate.predictions.create(genReplicatePayload("image_2")),
    ]);

    const hasError = predictions.some((prediction) => prediction?.error);
    if (hasError) {
      Sentry.captureException(hasError);
    }
  } catch (err) {
    Sentry.captureException(err);
  }

  return new Response(`Photo Code: ${slug}`, { status: 201 });
}
