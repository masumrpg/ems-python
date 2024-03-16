"use client";
import EmployeesTable from "./components/table";
import AddEmployeeDialog from "./components/add-employee";
import DataTable from "./components/table/data-table";
import { columns } from "./components/table/columns";
import { ResponseUsers } from "@/model/interface-client";
import { useQuery } from "@tanstack/react-query";
import getAllEmployeesAction from "@/action/getAllEmployeesAction";

export default function EmployeesPage() {
    const { isPending, error, data } = useQuery<ResponseUsers[]>({
        queryKey: ["users"],
        queryFn: async () => await getAllEmployeesAction(),
        refetchOnWindowFocus: "always",
        gcTime: 0
    });

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Employees</h1>
                <AddEmployeeDialog />
            </div>
            <div className="border shadow-sm rounded-lg">
                {/* <EmployeesTable/> */}
                <DataTable columns={columns} data={data} />
            </div>
        </main>
    );
}
