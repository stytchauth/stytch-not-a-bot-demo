"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { adminDeletePhotoAction } from "../app/admin/actions";
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminList({ photos }: { photos: any }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            not-a-bot photos
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Photos are sorted by the most recent. Click{" "}
            <b>Download to download the collage for printing</b>. Click{" "}
            <b>Delete</b> only if you are certain you want to delete the photo.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
      </div>
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 table-auto">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Code
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {photos.map((p: any, pIdx: number) => (
              <tr key={p.id}>
                <td
                  className={classNames(
                    pIdx === 0 ? "" : "border-t border-gray-200",
                    "hidden pl-4 pr-[850px] py-3.5 text-sm text-gray-500 lg:table-cell",
                  )}
                >
                  {p.id}
                </td>
                <td
                  className={classNames(
                    pIdx === 0 ? "" : "border-t border-transparent",
                    "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 items-end ml-24",
                  )}
                >
                  <div className="flex shrink-0 items-center gap-x-6">
                    <a
                      target="_blank"
                      href={`/collage/${p.id}`}
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Collage
                    </a>
                    <a
                      target="_blank"
                      href={`/images/collage/${p.id}`}
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Download
                    </a>
                    {pIdx !== 0 ? (
                      <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                    ) : null}
                    <Menu as="div" className="relative flex-none">
                      <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </MenuButton>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-18 origin-top-right bg-red-700 rounded-md py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  adminDeletePhotoAction(p.id);
                                }}
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-white bg-red-700",
                                )}
                              >
                                DELETE
                              </button>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
