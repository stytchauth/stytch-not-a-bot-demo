import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-cement py-4 mt-auto max-w-full">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 mx-auto py-2">
          <Link target="_blank" href="https://stytch.com">
            <Image
              alt="Powered by Stytch"
              src="powered-by-stytch.svg"
              width={170}
              height={18}
            />
          </Link>
        </div>
        <div className="md:col-span-1 py-2">
          <p className="text-center">© 2024 Stytch. All rights reserved.</p>
        </div>
        <div className="md:col-span-1 flex mx-auto py-2 sm:justify-end">
          <Link
            href="https://stytch.com/legal/terms-of-service"
            target="_blank"
            className="hover:underline pr-4"
          >
            Terms of use
          </Link>
          <Link
            href="https://stytch.com/legal/privacy-policy"
            target="_blank"
            className="hover:underline"
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
