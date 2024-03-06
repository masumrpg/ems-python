import SignInForm from "@/app/(auth)/signin/components/signin-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {Suspense} from "react";

export default function SignInPage() {
    return (
        <Card className="flex flex-col w-[25rem] my-16">
            <CardHeader>
                <CardTitle>Signin</CardTitle>
                <CardDescription>Please log in to your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense>
                    <SignInForm/>
                </Suspense>
            </CardContent>
        </Card>
    );
}