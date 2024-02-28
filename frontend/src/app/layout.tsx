import type {Metadata} from "next";
import "../style/globals.css";
import React from "react";
import {ThemeProvider} from "@/components/theme-provider";
import {Inter as FontSans} from "next/font/google";
import {cn} from "@/lib/utils";
import SideBar from "@/components/navigation/sidebar";
import {Toaster} from "@/components/ui/sonner";
import Provider from "@/components/provider";

export const metadata: Metadata = {
    title: "Employee Management",
    description: "Made by Masum"
};

// @ts-ignore
const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans"
});

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}>
                <Provider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Toaster richColors={true} position="top-center"/>
                        <SideBar>
                            {children}
                        </SideBar>
                    </ThemeProvider>
                </Provider>
            </body>
        </html>
    );
}
