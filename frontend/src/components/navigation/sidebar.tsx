"use client";
import Link from "next/link";
import {
    Bell,
    FileTextIcon,
    LayersIcon,
    LineChart,
    Menu,
    Package2,
    Search,
    SettingsIcon,
    UsersIcon
} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {toast} from "sonner";
import signOutAction from "@/action/employees/signOutAction";
import ModeToggle from "@/components/mode-toggle";

const navLinks = [
    {
        path: "/dashboard",
        icon: <LineChart className="h-4 w-4"/>,
        text: "Dashboard",
        badge: false,
        badgeValue: null
    },
    {
        path: "/employees",
        icon: <UsersIcon className="h-4 w-4"/>,
        text: "Employees",
        badge: true,
        badgeValue: 3
    },
    {
        path: "/attendance",
        icon: <LayersIcon className="h-4 w-4"/>,
        text: "Attendance",
        badge: false,
        badgeValue: null
    },
    {
        path: "/reports",
        icon: <FileTextIcon className="h-4 w-4"/>,
        text: "Reports",
        badge: false,
        badgeValue: null
    },
    {
        path: "/settings",
        icon: <SettingsIcon className="h-4 w-4"/>,
        text: "Settings",
        badge: false,
        badgeValue: null
    }
];

export default function SideBar({children}: { children: React.ReactNode }) {
    const path = usePathname();
    const isPathInList = navLinks.some((item) => item.path === path);

    const handleSignout = async () => {
        const error = await signOutAction();
        if (error) {
            toast.error(error.error);
        } else {
            toast.success("Signout success");
        }
    };

    return (
        <div
            className={cn(
                !isPathInList
                    ? ""
                    : "grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
            )}
        >
            {!isPathInList ? null : (
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link
                                href="/"
                                className="flex items-center gap-2 font-semibold"
                            >
                                <Package2 className="h-6 w-6"/>
                                <span className="">Masum Inc</span>
                            </Link>
                            <Button
                                variant="outline"
                                size="icon"
                                className="ml-auto h-8 w-8"
                            >
                                <Bell className="h-4 w-4"/>
                                <span className="sr-only">
                                    Toggle notifications
                                </span>
                            </Button>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-4 text-sm font-medium">
                                {navLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        className={cn(
                                            path === link.path
                                                ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                                                : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                        )}
                                        href={link.path}
                                    >
                                        {link.icon}
                                        {link.text}
                                        {link.badge && (
                                            <Badge
                                                className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                                {link.badgeValue}
                                            </Badge>
                                        )}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
            <div className={cn(!isPathInList ? "" : "flex flex-col")}>
                {!isPathInList ? null : (
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5"/>
                                    <span className="sr-only">
                                        Toggle navigation menu
                                    </span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <nav className="grid gap-2 text-lg font-medium">
                                    <Link
                                        href="#"
                                        className="flex items-center gap-2 text-lg font-semibold"
                                    >
                                        <Package2 className="h-6 w-6"/>
                                        <span className="sr-only">
                                            Acme Inc
                                        </span>
                                    </Link>
                                    {navLinks.map((link, index) => (
                                        <Link
                                            key={index}
                                            className={cn(
                                                path === link.path
                                                    ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                                                    : "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                            )}
                                            href={link.path}
                                        >
                                            {link.icon}
                                            {link.text}
                                            {link.badge && (
                                                <Badge
                                                    className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                                    {link.badgeValue}
                                                </Badge>
                                            )}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <div className="w-full flex-1">
                            <form>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                    <Input
                                        type="search"
                                        placeholder="Search anything..."
                                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                    />
                                </div>
                            </form>
                        </div>
                        <ModeToggle/>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="rounded-full"
                                >
                                    <Image
                                        alt="Avatar"
                                        className="rounded-full"
                                        height="32"
                                        src="https://github.com/shadcn.png"
                                        style={{
                                            aspectRatio: "32/32",
                                            objectFit: "cover"
                                        }}
                                        width="32"
                                    />
                                    <span className="sr-only">
                                        Toggle user menu
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem className="cursor-pointer">
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    Support
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem
                                    onClick={handleSignout}
                                    className="cursor-pointer"
                                >
                                    Signout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                )}
                {children}
            </div>
        </div>
    );
}
