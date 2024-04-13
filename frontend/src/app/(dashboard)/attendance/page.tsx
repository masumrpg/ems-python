import {AttendanceTable} from "./components/table";
import getAllEmployeesAction from "@/action/attendance/getAllAttendanceAction";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Attendance",
    description: "Made by Masum"
};

export const revalidate = 0;

export default async function AttendancePage() {
    const res = await getAllEmployeesAction({});
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Attendance</h1>
                {/*<Button className="ml-auto" size="sm">*/}
                {/*    Okeyyyy*/}
                {/*</Button>*/}
            </div>
            <div className="border shadow-sm rounded-lg">
                <AttendanceTable data={!res.content ? [] : res.content}/>
            </div>
        </main>
    );
}
