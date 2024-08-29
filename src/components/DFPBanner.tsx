import Link from "next/link";

export default function DFPBanner() {
  return (
    <section className="flex overflow-hidden flex-col justify-center px-4 py-2.5 mb-6 text-sm leading-none rounded-3xl bg-neutral-700 max-w-[503px] shadow-[0px_3px_6px_rgba(25,48,61,0.1)]">
      <div className="flex gap-3 items-center max-md:max-w-full">
        <p className="self-stretch my-auto font-medium text-white">
          Based on Stytch fingerprint analysis, you’re not a bot!
        </p>
        <Link
          className="flex gap-1.5 items-center self-stretch my-auto font-bold text-white rounded-lg"
          href="https://stytch.com/blog/application-security-in-the-age-of-ai/"
          target="_blank"
        >
          <span className="self-stretch my-auto bg-blend-normal whitespace-nowrap">
            Learn more &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
