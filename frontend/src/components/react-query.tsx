"use client";
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: { queries: {gcTime: 60000}}
});

export default function ReactQuery(
    {
        children
    }: {
        children: React.ReactNode;
    }
) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}