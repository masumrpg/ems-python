import AddEmployeeDialog from "./components/table/add-employee";
import {columns} from "./components/table/columns";
import getAllEmployeesAction from "@/action/employees/getAllEmployeesAction";
import Loading from "@/app/loading";
import EmployeeTable from "./components/table";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Employees",
    description: "Made by Masum"
};

export const revalidate = 0;

export default async function EmployeesPage() {
    const data = await getAllEmployeesAction({});
    if (!data.content) {
        return <Loading/>;
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Employees</h1>
                <AddEmployeeDialog/>
            </div>
            <div className="border shadow-sm rounded-lg">
                <EmployeeTable columns={columns} data={data}/>
            </div>
        </main>
    );
}
