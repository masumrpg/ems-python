"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Error</h1>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        Something went wrong!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        You can retry for reload the page.
                    </p>
                    <Button className="mt-4" onClick={() => reset()}>
                        Try again
                    </Button>
                </div>
            </div>
        </main>
    );
}
