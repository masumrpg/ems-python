"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ResponseUsers } from "@/model/interface-client";
import { Badge } from "@/components/ui/badge";
import DeleteEmployeeDialog from "../delete-employee";
import { toast } from "sonner";
import { DeleteAlert } from "../delete-alert";
import { TestAlert } from "./test";
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === "asc");
                    }}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        accessorKey: "id",
        cell: ({ row }) => {
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
                <div>{employee.is_superuser === true ? "admin" : "user"}</div>
            );
        }
    },
    {
        header: "Verify",
        accessorKey: "is_verified",
        cell: ({row}) => {
            const employee = row.original;
            return (
                <div>{employee.is_verified === true ? <Badge>Verified</Badge> : <Badge variant="destructive">Not Verified</Badge>}</div>
            );
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const employee = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    employee.id.toString()
                                );
                                toast.info("ID copyed to clipboard");
                            }}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            toast.info("Ok");
                            return <TestAlert/>;
                        }}>
                            {/* FIXME */}
                            {/* <DeleteAlert/> */}
                            Ok
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
];
