import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="bg-charcoal text-white">
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 pt-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <Image
                  alt="not-a-bot logo"
                  src="not-a-bot-logo-white.svg"
                  width={190}
                  height={50}
                  priority={true}
                />
              </Link>
            </div>
          </div>
          <div className="absolute hidden inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-6 lg:block">
            <Link
              className="relative text-white"
              target="_blank"
              href="https://www.stytch.com/docs/home"
            >
              Stytch Docs
            </Link>
            <Link
              className="bg-neon rounded-full text-charcoal ml-5 items-center justify-center bg-indigo-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              target="_blank"
              href="https://github.com/stytchauth/stytch-not-a-bot-demo"
            >
              View Code &rarr;
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
