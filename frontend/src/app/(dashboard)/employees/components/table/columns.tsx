"use client";
import {Button} from "@/components/ui/button";
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {ResponseUsers} from "@/interface/interface-client";
import {Badge} from "@/components/ui/badge";
import {DeleteAlert} from "../delete-alert";
import EditEmployeeDialog from "@/app/(dashboard)/employees/components/edit-employee";
// import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<ResponseUsers>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => {
    //         return (
    //             <Checkbox
    //                 checked={table.getIsAllPageRowsSelected()}
    //                 onCheckedChange={(value) => {
    //                     table.toggleAllPageRowsSelected(!!value);
    //                 }}
    //             />
    //         );
    //     },
    //     cell: ({ row }) => {
    //         return (
    //             <Checkbox
    //                 checked={row.getIsSelected()}
    //                 onCheckedChange={(value) => {
    //                     row.toggleSelected(!!value);
    //                 }}
    //             />
    //         );
    //     },
    //     enableSorting: false,
    //     enableHiding: false
    // },
    {
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === "asc");
                    }}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        accessorKey: "id",
        cell: ({row}) => {
            const employee = row.original;
            const uuid = employee.id;
            const employeeId = uuid.slice(uuid.length - 6);
            return <div>{employeeId}</div>;
        }
    },
    {
        header: "Name",
        accessorKey: "full_name"
    },
    {
        header: "Username",
        accessorKey: "username"
    },
    {
        header: "Email",
        accessorKey: "email"
    },
    {
        header: "Role",
        accessorKey: "is_superuser",
        cell: ({row}) => {
            const employee = row.original;
            return (
                <div>{employee.is_superuser ? "admin" : "user"}</div>
            );
        }
    },
    {
        header: "Verify",
        accessorKey: "is_verified",
        cell: ({row}) => {
            const employee = row.original;
            return (
                <div>{employee.is_verified ? <Badge>Verified</Badge> :
                    <Badge variant="destructive">Not Verified</Badge>}</div>
            );
        }
    },
    {
        id: "actions",
        header: "Action",
        cell: ({row}) => {
            const user: ResponseUsers = row.original;
            return (
                <div className="space-x-2">
                    <EditEmployeeDialog user={user}/>
                    <DeleteAlert user={user}/>
                </div>
            );
        }
    }
];
