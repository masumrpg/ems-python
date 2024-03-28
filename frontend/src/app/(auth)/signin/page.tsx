import SignInForm from "@/app/(auth)/signin/components/signin-form";
import Animations from "@/animations/animations";

export default function SignInPage() {
    return (
        <main className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
            <div className="flex items-center justify-center">
                <SignInForm />
            </div>
            <div className="hidden bg-primary lg:block">
                <Animations className="flex items-center justify-center" />
            </div>
        </main>
    );
}
