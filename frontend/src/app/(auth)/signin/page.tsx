import SignInForm from "@/components/auth/signin-form";
import {Suspense} from "react";

export default function SignInPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <Suspense>
                <SignInForm/>
            </Suspense>
        </main>
    );
}