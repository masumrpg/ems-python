import {Button} from "@/components/ui/button";
import {auth} from "@/lib/auth";

export default async function DashboardPage() {
    const session = await auth();
    if (!session) {
        return <Button>Try Again</Button>;
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
                {`Haiii ${session?.user.full_name}`}
                <Button className="ml-auto" size="sm">
                    Ok
                </Button>
            </div>
        </main>
    );
}