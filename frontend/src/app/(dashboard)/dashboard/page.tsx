"use client";
import {Button} from "@/components/ui/button";
import { Dashboard } from "./components/dashboard";

export default function DashboardPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
                <Button className="ml-auto" size="sm">
                    Okeyyyy
                </Button>
            </div>
            <div className="border shadow-sm rounded-lg">
                {/* <Dashboard/> */}
            </div>
        </main>
    );
}