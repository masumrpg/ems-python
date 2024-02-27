"use client";
import Link from "next/link";
import {BellIcon, FileTextIcon, Home, LayersIcon, Package2Icon, SettingsIcon, UsersIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";
import Header from "@/components/navigation/header";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

const navLinks = [
    {path: "/dashboard", icon: <Home className="h-4 w-4"/>, text: "Dashboard"},
    {path: "/employees", icon: <UsersIcon className="h-4 w-4"/>, text: "Employees"},
    {path: "/departments", icon: <LayersIcon className="h-4 w-4"/>, text: "Departments"},
    {path: "/reports", icon: <FileTextIcon className="h-4 w-4"/>, text: "Reports"},
    {path: "/settings", icon: <SettingsIcon className="h-4 w-4"/>, text: "Settings"}
];

export default function SideBar({children}: { children: React.ReactNode }) {
    const path = usePathname();
    const isPathInList = navLinks.some(item => item.path === path);

    return (
        <div className={cn(
            !isPathInList ? "" : "grid h-screen w-full min-h-screen lg:grid-cols-[280px_1fr]"
        )}>
            {!isPathInList ? null : (
                <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-[60px] items-center border-b px-6">
                            <Link className="flex items-center gap-2 font-semibold" href="#">
                                <Package2Icon className="h-6 w-6"/>
                                <span className="">Acme Inc</span>
                            </Link>
                            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
                                <BellIcon className="h-4 w-4"/>
                                <span className="sr-only">Toggle notifications</span>
                            </Button>
                        </div>
                        <div className="flex-1 overflow-auto py-2">
                            <nav className="grid items-start px-4 text-sm font-medium">
                                {/*<Link*/}
                                {/*    className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"*/}
                                {/*    href="#"*/}
                                {/*>*/}
                                {/*    <UsersIcon className="h-4 w-4"/>*/}
                                {/*    Employees*/}
                                {/*</Link>*/}
                                {/*<Link*/}
                                {/*    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"*/}
                                {/*    href="#"*/}
                                {/*>*/}
                                {/*    <LayersIcon className="h-4 w-4"/>*/}
                                {/*    Departments*/}
                                {/*</Link>*/}
                                {/*<Link*/}
                                {/*    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"*/}
                                {/*    href="#"*/}
                                {/*>*/}
                                {/*    <FileTextIcon className="h-4 w-4"/>*/}
                                {/*    Reports*/}
                                {/*</Link>*/}
                                {/*<Link*/}
                                {/*    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"*/}
                                {/*    href="#"*/}
                                {/*>*/}
                                {/*    <SettingsIcon className="h-4 w-4"/>*/}
                                {/*    Settings*/}
                                {/*</Link>*/}

                                {navLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        className={cn(
                                            path === link.path ? "flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50" : "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                        )}
                                        href={link.path}
                                    >
                                        {link.icon}
                                        {link.text}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col">
                {!isPathInList ? null : (<Header/>)}
                {children}
            </div>
        </div>
    );
}