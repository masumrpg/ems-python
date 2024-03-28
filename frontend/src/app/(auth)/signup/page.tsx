import Animations from "@/animations/animations";
import SignUpForm from "./components/signup-form";

export default function SignUpPage() {
    return (
        <main className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
            <div className="flex items-center justify-center">
                <SignUpForm />
            </div>
            <div className="hidden bg-primary lg:block">
                <Animations className="flex items-center justify-center" />
            </div>
        </main>
    );
}
