import EmployeesTable from "./components/table";
import  AddEmployeeDialog  from "./components/add-employee";

export default function EmployeesPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Employees</h1>
                <AddEmployeeDialog/>
            </div>
            <div className="border shadow-sm rounded-lg">
                <EmployeesTable/>
            </div>
        </main>
    );
}



