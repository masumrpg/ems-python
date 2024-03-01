import {Button} from "@/components/ui/button";
import EmployeesTable from "./components/table";
import { Suspense } from "react";
import EmployeesTableSkeleton from "./components/table-skeleton";
import { toast } from "sonner";

export default function EmployeesPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Employees</h1>
                <Button className="ml-auto" size="sm">
                    Add employee
                </Button>
            </div>
            <div className="border shadow-sm rounded-lg">
                {/* <Suspense fallback={<EmployeesTableSkeleton/>}> */}
                <EmployeesTable/>
                {/* </Suspense> */}
            </div>
        </main>
    );
}



