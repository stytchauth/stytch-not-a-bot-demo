"use client";

import Image from "next/image";

import { useFormState } from "react-dom";
import { FormState, saveUserToPhotoAction } from "./actions";

export default function GetCodePage() {
  const [formState, wrappedSaveUserToPhotoAction] = useFormState(
    saveUserToPhotoAction,
    {
      code: "",
      errors: {
        code: undefined,
      },
    } as FormState,
  );

  return (
    <main className="flex min-h-screen bg-charcoal text-white">
      <div className="w-96 m-auto max-w-2xl">
        <div className="flex flex-col justify-center my-32">
          <div className="">
            <div className="px-4 py-5 sm:p-6">
              <Image
                className="m-auto my-10"
                alt="not-a-bot logo"
                src="not-a-bot-logo-white.svg"
                width={190}
                height={50}
                priority={true}
              />
              <div className="my-10 text-xl font-medium text-center text-white">
                <p>Enter code to get the photos associated with the code.</p>
              </div>
              <form action={wrappedSaveUserToPhotoAction} className="mt-5">
                <div className="w-full">
                  <label htmlFor="email" className="sr-only">
                    Code
                  </label>
                  <input
                    defaultValue={formState.code}
                    required
                    name="code"
                    className="block w-full text-white bg-charcoal rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-white placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    placeholder="Enter code"
                  />
                  {formState.errors.code && (
                    <div className="text-red-400">{formState.errors.code}</div>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-neon rounded-full text-charcoal mt-5 w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get AI Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
