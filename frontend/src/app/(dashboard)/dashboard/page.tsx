import {Button} from "@/components/ui/button";
import {Dashboard} from "./components/dashboard";
import getStatisticsAction from "@/action/dashboard/getStatisticsAction";
import {DashboardProps} from "@/interface/interface-client";

export const revalidate = 0;

export default async function DashboardPage() {
    const data: DashboardProps = await getStatisticsAction();
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
                <Button className="ml-auto" size="sm">
                    Okeyyyy
                </Button>
            </div>
            <div className="border shadow-sm rounded-lg">
                <Dashboard data={data}/>
            </div>
        </main>
    );
}
