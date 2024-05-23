"use client";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";
import { Fragment } from "react";

export default function SocialMenu({
  baseUrl,
  collagePageUrl,
}: {
  baseUrl: string;
  collagePageUrl: string;
}) {
  const shareText =
    "Quick, which one is the real me?\n\n@identiverse with @stytchauth talking about the implications of AI on CIAM.\n";
  const shareUrl = `\n${baseUrl}${collagePageUrl}\n\n`;
  const shareHashTags = ["ai", "identiverse", "notabot"];
  return (
    <Popover className="relative inline-block">
      <PopoverButton
        as="div"
        className="w-full lg:w-auto inline-block border border-cement rounded-full text-white items-center justify-center text-center px-3 py-2 font-bold hover:bg-neon hover:text-charcoal focus-visible:outline-charcoal"
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
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg>
        <span>Share</span>
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-2 lg:ml-16 flex w-screen max-w-min -translate-x-1/2 px-4">
          <div className="w-56 shrink rounded-xl bg-charcoal border border-cement text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-gray-900/5">
            <TwitterShareButton
              url={shareUrl}
              title={shareText}
              hashtags={shareHashTags}
              blankTarget
            >
              <div className="flex items-center p-4 space-x-2 w-full">
                <TwitterIcon size={32} round />
                <span className="text-cement text-center p-2">X / Twitter</span>
              </div>
            </TwitterShareButton>

            <a
              className="items-center"
              href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURI(`${shareText}${shareUrl}`)} %23ai %23identiverse %23notabot`}
              target="_blank"
            >
              <div className="flex items-center p-4 space-x-2 w-full">
                <LinkedinIcon size={32} round />
                <span className="text-cement text-center p-2">LinkedIn</span>
              </div>
            </a>
            <FacebookShareButton url={shareUrl} title={shareText} blankTarget>
              <div className="flex items-center p-4 space-x-2 w-full">
                <FacebookIcon size={32} round />
                <span className="text-cement text-center p-2">Facebook</span>
              </div>
            </FacebookShareButton>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
