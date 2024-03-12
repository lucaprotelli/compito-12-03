import { Fragment, useState } from "react"
import { Combobox, Dialog, Transition } from "@headlessui/react"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import {
    InformationCircleIcon,
    HashtagIcon,
    TagIcon,
    PlusCircleIcon,
    MinusCircleIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"

// Questo è l'array di oggetti nel quale bisogna aggiungere i prodotti
const products = [
    { id: 1, name: "Formaggio", url: "#" },
    // More products...
]

// Prodotto recente di default
const recent = [products[0]]
// Azioni rapide non ancora implementate
const quickActions = [
    {
        name: "Add new product...",
        icon: PlusCircleIcon,
        shortcut: "N",
        url: "#",
    },
    {
        name: "Remove product...",
        icon: MinusCircleIcon,
        shortcut: "F",
        url: "#",
    },
    { name: "Add hashtag...", icon: HashtagIcon, shortcut: "H", url: "#" },
    { name: "Add label...", icon: TagIcon, shortcut: "L", url: "#" },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function MenuCMDK() {
    const [query, setQuery] = useState("")
    const [open, setOpen] = useState(false)

    const filteredproducts =
        query === ""
            ? []
            : products.filter((product) => {
                  return product.name
                      .toLowerCase()
                      .includes(query.toLowerCase())
              })

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen((open) => !open)}
                className="inline-flex items-center gap-x-1.5 mt-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                <MagnifyingGlassIcon
                    className="-ml-0.5 h-5 w-5 font-normal text-gray-700"
                    aria-hidden="true"
                />
                Open Menu
            </button>
            <Transition.Root
                show={open}
                as={Fragment}
                afterLeave={() => setQuery("")}
                appear
            >
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
                                <Combobox
                                    onChange={(item) =>
                                        (window.location = item.url)
                                    }
                                >
                                    <div className="relative">
                                        <MagnifyingGlassIcon
                                            className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-900 text-opacity-40"
                                            aria-hidden="true"
                                        />
                                        <Combobox.Input
                                            className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 focus:ring-0 sm:text-sm"
                                            placeholder="Search..."
                                            onChange={(event) =>
                                                setQuery(event.target.value)
                                            }
                                        />
                                    </div>

                                    {(query === "" ||
                                        filteredproducts.length > 0) && (
                                        <Combobox.Options
                                            static
                                            className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto"
                                        >
                                            <li className="p-2">
                                                {query === "" && (
                                                    <h2 className="mb-2 mt-4 px-3 text-xs font-semibold text-gray-900">
                                                        Recent searches
                                                    </h2>
                                                )}
                                                <ul className="text-sm text-gray-700">
                                                    {(query === ""
                                                        ? recent
                                                        : filteredproducts
                                                    ).map((product) => (
                                                        <Combobox.Option
                                                            key={product.id}
                                                            value={product}
                                                            className={({
                                                                active,
                                                            }) =>
                                                                classNames(
                                                                    "flex cursor-default select-none items-center rounded-md px-3 py-2",
                                                                    active &&
                                                                        "bg-gray-900 bg-opacity-5 text-gray-900"
                                                                )
                                                            }
                                                        >
                                                            {({ active }) => (
                                                                <>
                                                                    <InformationCircleIcon
                                                                        className={classNames(
                                                                            "h-6 w-6 flex-none text-gray-900 text-opacity-40",
                                                                            active &&
                                                                                "text-opacity-100"
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                    <span className="ml-3 flex-auto truncate">
                                                                        {
                                                                            product.name
                                                                        }
                                                                    </span>
                                                                    {active && (
                                                                        <span className="ml-3 flex-none text-gray-500">
                                                                            Jump
                                                                            to...
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </Combobox.Option>
                                                    ))}
                                                </ul>
                                            </li>
                                            {query === "" && (
                                                <li className="p-2">
                                                    <h2 className="sr-only">
                                                        Quick actions
                                                    </h2>
                                                    <ul className="text-sm text-gray-700">
                                                        {quickActions.map(
                                                            (action) => (
                                                                <Combobox.Option
                                                                    key={
                                                                        action.shortcut
                                                                    }
                                                                    value={
                                                                        action
                                                                    }
                                                                    className={({
                                                                        active,
                                                                    }) =>
                                                                        classNames(
                                                                            "flex cursor-default select-none items-center rounded-md px-3 py-2",
                                                                            active &&
                                                                                "bg-gray-900 bg-opacity-5 text-gray-900"
                                                                        )
                                                                    }
                                                                >
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <>
                                                                            <action.icon
                                                                                className={classNames(
                                                                                    "h-6 w-6 flex-none text-gray-900 text-opacity-40",
                                                                                    active &&
                                                                                        "text-opacity-100"
                                                                                )}
                                                                                aria-hidden="true"
                                                                            />
                                                                            <span className="ml-3 flex-auto truncate">
                                                                                {
                                                                                    action.name
                                                                                }
                                                                            </span>
                                                                            <span className="ml-3 flex-none text-xs font-semibold text-gray-500">
                                                                                <kbd className="font-sans">
                                                                                    ⌘
                                                                                </kbd>
                                                                                <kbd className="font-sans">
                                                                                    {
                                                                                        action.shortcut
                                                                                    }
                                                                                </kbd>
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </Combobox.Option>
                                                            )
                                                        )}
                                                    </ul>
                                                </li>
                                            )}
                                        </Combobox.Options>
                                    )}

                                    {query !== "" &&
                                        filteredproducts.length === 0 && (
                                            <div className="px-6 py-14 text-center sm:px-14">
                                                <ExclamationTriangleIcon
                                                    className="mx-auto h-6 w-6 text-gray-900 text-opacity-40"
                                                    aria-hidden="true"
                                                />
                                                <p className="mt-4 text-sm text-gray-900">
                                                    We could not find any
                                                    products with that term.
                                                    Please try again.
                                                </p>
                                            </div>
                                        )}
                                </Combobox>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
