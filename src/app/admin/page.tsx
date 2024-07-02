import AdminList from "@/src/components/AdminList";
import Image from "next/image";
import Link from "next/link";
import { getAllPhotos } from "../db";
import { getStytchAdminUser } from "../shared-actions";

export default async function Admin() {
  await getStytchAdminUser(); // check for admin user and redirect if not
  const photos = await getAllPhotos();

  return (
    <>
      <nav className="">
        <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 pt-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <Image
                    alt="not-a-bot logo"
                    src="not-a-bot-logo-black.svg"
                    width={190}
                    height={50}
                    priority={true}
                  />
                </Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-6 lg:block"></div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto min-h-screen mt-12 bg-white">
        <AdminList photos={photos} />
      </main>
    </>
  );
}
