import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(
  { params }: { params: { code: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const code = params.code;

  return {
    title: "Stytch not-a-bot Collage",
    openGraph: {
      description:
        "Quick, which one is the real me?\n\n@identiverse with @stytchauth talking about the implications of AI on CIAM.\n",
      images: [`/images/collage/${code}`],
    },
  };
}

export default async function CollageImagePage({
  params,
}: {
  params: { code: string };
}) {
  const code = params.code;

  return (
    <main className="flex min-h-screen bg-charcoal text-white">
      <div className="w-full m-auto max-w-7xl">
        <div className="flex flex-col justify-center my-24">
          <div className="px-4 py-5 sm:p-6">
            <Image
              className="m-auto my-10"
              alt="not-a-bot logo"
              src="/not-a-bot-logo-white.svg"
              width={190}
              height={50}
              priority={true}
            />
          </div>
          <div className="mx-auto">
            <Link href={`/images/collage/${code}?ik-attachment=true`}>
              <Image
                src={`/images/collage/${code}`}
                width={700}
                height={500}
                alt="Collage"
              />
            </Link>
          </div>
          <div className="mx-auto px-4 py-10">
            <Link target="_blank" href="https://stytch.com">
              <Image
                alt="Powered by Stytch"
                src="/powered-by-stytch.svg"
                width={170}
                height={18}
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
