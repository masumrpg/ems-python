"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useTheme } from "next-themes";

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <div className="z-50 fixed top-6 right-6 lg:top-8 text-center">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="tremor-Button-root flex-shrink-0 inline-flex justify-center items-center group font-medium outline-none rounded-tremor-default border shadow-tremor-input dark:shadow-dark-tremor-input p-2 text-sm text-tremor-brand dark:text-dark-tremor-brand bg-transparent border-tremor-brand dark:border-dark-tremor-brand hover:text-tremor-brand-emphasis dark:hover:text-dark-tremor-brand-emphasis hover:bg-tremor-brand-faint dark:hover:bg-dark-tremor-brand-faint">
                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-tremor-background dark:bg-dark-tremor-background shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({active}) => (
                                    // text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis
                                    <button onClick={() => setTheme("light")}
                                        className={`${
                                            active ? 'bg-tremor-brand-emphasis dark:bg-dark-tremor-brand-emphasis text-white' : 'text-gray-900 dark:text-white'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        Light
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <button onClick={() => setTheme("dark")}
                                        className={`${
                                            active ? 'bg-tremor-brand-emphasis dark:bg-dark-tremor-brand-emphasis text-white' : 'text-gray-900 dark:text-white'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        Dark
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <button onClick={() => setTheme("system")}
                                        className={`${
                                            active ? 'bg-tremor-brand-emphasis dark:bg-dark-tremor-brand-emphasis text-white' : 'text-gray-900 dark:text-white'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        System
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}