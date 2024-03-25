import AddEmployeeDialog from "./components/add-employee";
import DataTable from "./components/table/data-table";
import { columns } from "./components/table/columns";
import getAllEmployeesAction from "@/action/getAllEmployeesAction";
import { UserPaginationResponse } from "@/interface/interface-client";

export const revalidate = 0;

export default async function EmployeesPage() {
    const data: UserPaginationResponse = await getAllEmployeesAction();
    if (!data.content) {
        return <p>No Result</p>;
    }
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Employees</h1>
                <AddEmployeeDialog />
            </div>
            <div
                className="border shadow-sm rounded-lg"
                suppressHydrationWarning={true}
            >
                <DataTable columns={columns} data={data.content} />
            </div>
        </main>
    );
}
