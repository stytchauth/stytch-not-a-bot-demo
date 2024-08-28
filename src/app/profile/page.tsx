import { headers } from "next/headers";
import Image from "next/image";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import SocialMenu from "@/src/components/SocialMenu";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { stytchFingerprintLookup } from "../shared-actions";
import { isMobileUserAgent } from "../utils";
import { getCollageUrlForUser, getPhotosForUser } from "./actions";

const BASE_URL = process.env.HOSTED_URL
  ? process.env.HOSTED_URL
  : "http://localhost:3000";

export async function generateMetadata(
  { params }: { params: { code: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const code = params.code;

  return {
    title: "Stytch not-a-bot Collage",
    openGraph: {
      description:
        "Quick, which one is the real me?\n\n@identiverse with @stytchauth talking about the implications of AI on CIAM.\n",
    },
  };
}

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const headersList = headers();
  const isMobile = isMobileUserAgent(headersList.get("user-agent"));
  const photos = await getPhotosForUser(isMobile);
  const { collagePageUrl, collageImageUrl } =
    (await getCollageUrlForUser()) as {
      collagePageUrl: string;
      collageImageUrl: string;
    };

  const telemetryId = searchParams.telemetryId as string | undefined;
  const lookupResult = await stytchFingerprintLookup({
    telemetry_id: telemetryId!,
  });

  console.log("Lookup result:", lookupResult);

  return (
    <>
      <Header />
      <main className="bg-charcoal text-white py-8 sm:pt-24 sm:pb-24 flex-1 lg:h-[calc(100vh-164px)]">
        <div className="mx-auto max-w-full px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-neon lg:text-[65px] lg:leading-[65px]">
                Meet your AI doppelgängers
              </h2>
              <div className="my-8 hidden lg:block">
                <div className="space-x-4 lg:space-x-2">
                  <ActionButtons
                    collageImageUrl={collageImageUrl!}
                    collagePageUrl={collagePageUrl}
                  />
                </div>
              </div>
              <p className="font-mono text-xl mt-6 text-lg leading-8">
                What users on your app are AI generated bots? Guard against bots
                and fraud with Stytch.
              </p>
              <div className="mt-8">
                <Link
                  className="text-white font-bold"
                  target="_blank"
                  href="https://stytch.com/blog/application-security-in-the-age-of-ai/"
                >
                  Learn More &rarr;
                </Link>
              </div>
            </div>
            <div className="ml-5 col-span-2 grid grid-cols-1 gap-x-8 gap-y-16">
              <div>
                <div className="border-cement border border-solid rounded-md p-2 md:p-4 z-40">
                  <div className="border-cement border border-solid rounded-md p-2 -ml-5 -mb-5 md:p-4 md:-ml-10 md:-mb-10 z-30 bg-charcoal">
                    <div className="border-cement border border-solid rounded-md p-2 -ml-5 -mb-5 md:p-4 md:-ml-10 md:-mb-10 z-20 bg-charcoal">
                      <div className="grid grid-cols-2 gap-4 place-content-center h-auto mx-auto">
                        {photos &&
                          photos.map((photo, index) => (
                            <div key={index}>
                              {photo && (
                                <div className="flex justify-center items-center relative h-64">
                                  <Image
                                    className="object-cover max-h-full max-w-full rounded-md"
                                    priority={true}
                                    fill={true}
                                    src={photo}
                                    alt={`photo-${index}`}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto w-3/4 mt-24 lg:hidden">
            <div className="grid grid-cols-1 space-y-3">
              <ActionButtons
                collageImageUrl={collageImageUrl!}
                collagePageUrl={collagePageUrl}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ActionButtons({
  collageImageUrl,
  collagePageUrl,
}: {
  collageImageUrl: string;
  collagePageUrl: string;
}) {
  return (
    <>
      <SocialMenu baseUrl={BASE_URL} collagePageUrl={collagePageUrl} />
      <Link
        className="border border-cement rounded-full text-white items-center justify-center text-center px-3 py-2 font-bold shadow-sm hover:bg-neon hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cement"
        target="_blank"
        href={`${collageImageUrl}?ik-attachment=true`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 inline-block mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
        Download
      </Link>
      <Link
        className="border border-cement rounded-full text-white items-center justify-center text-center px-3 py-2 font-bold shadow-sm hover:bg-neon hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cement"
        target="_blank"
        href="https://github.com/stytchauth/stytch-not-a-bot-demo"
      >
        View Code &rarr;
      </Link>
    </>
  );
}
