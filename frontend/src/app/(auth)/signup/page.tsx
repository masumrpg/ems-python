import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "./components/signup-form";

export default function SignUpPage() {
    return (
        <Card className="flex flex-col w-[25rem]">
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Please signup for new user.</CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>
    );
}
