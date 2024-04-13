"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ResponseUsers } from "@/interface/interface-client";
import { Badge } from "@/components/ui/badge";
import { DeleteEmployee } from "./delete-employee";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import EditEmployeeSheet from "@/app/(dashboard)/employees/components/table/edit-employee";
import Link from "next/link";

export const columns: ColumnDef<ResponseUsers>[] = [
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
        cell: ({ row }) => {
            const employee = row.original;
            return <div>{employee.is_superuser ? "admin" : "user"}</div>;
        }
    },
    {
        header: () => {
            return <p className={"text-center"}>Verified</p>;
        },
        accessorKey: "is_verified",
        cell: ({ row }) => {
            const employee = row.original;
            return (
                <div className={"text-center"}>
                    {employee.is_verified ? (
                        <Badge>Verified</Badge>
                    ) : (
                        <Badge variant="destructive">Unverified</Badge>
                    )}
                </div>
            );
        }
    },
    {
        id: "actions",
        header: () => {
            return <p className={"text-center"}>Actions</p>;
        },
        enableHiding: false,
        cell: ({ row }) => {
            const user: ResponseUsers = row.original;
            const userId = row.original.id;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className={"flex justify-center items-center"}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className={"cursor-pointer"}>
                            <Link href={`/employees/${userId}`}>View</Link>
                        </DropdownMenuItem>
                        <div
                            className={
                                "relative flex cursor-pointer select-none hover:bg-muted items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            }
                        >
                            <EditEmployeeSheet user={user} />
                        </div>
                        <DropdownMenuSeparator />
                        <div
                            className={
                                "relative flex cursor-pointer select-none hover:bg-muted items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            }
                        >
                            <DeleteEmployee user={user} />
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
];
