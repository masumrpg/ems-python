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
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-row h-full w-full items-center justify-center">
            <h2>Something went wrong!</h2>
            <Button
                // variant="ghost"
                onClick={
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    );
}
