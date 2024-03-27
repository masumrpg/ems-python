"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ResponseUsers } from "@/interface/interface-client";
import { Badge } from "@/components/ui/badge";
import { DeleteAlert } from "../delete-alert";
import EditEmployeeDialog from "@/app/(dashboard)/employees/components/edit-employee";

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
        header: "Verify",
        accessorKey: "is_verified",
        cell: ({ row }) => {
            const employee = row.original;
            return (
                <div>
                    {employee.is_verified ? (
                        <Badge>Verified</Badge>
                    ) : (
                        <Badge variant="destructive">Not Verified</Badge>
                    )}
                </div>
            );
        }
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
            const user: ResponseUsers = row.original;
            return (
                <div className="space-x-2">
                    <EditEmployeeDialog user={user} />
                    <DeleteAlert user={user} />
                </div>
            );
        }
    }
];
