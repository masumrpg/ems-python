import SignInForm from "@/components/auth/signin-form";
import {Suspense} from "react";

export default function SignInPage() {
    return (
        <Suspense>
            <SignInForm/>
        </Suspense>
    );
}