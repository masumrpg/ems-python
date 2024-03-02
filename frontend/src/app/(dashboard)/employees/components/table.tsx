"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileEditIcon } from "lucide-react";
import Image from "next/image";
import EmployeesTableSkeleton from "./table-skeleton";
import { toast } from "sonner";
import {  useState } from "react";
import { ResponseUsers } from "@/model/interface";
import getAllEmployeesAction from "@/action/getAllEmployeesAction";
import { useMutation, useQuery } from "@tanstack/react-query";
import deleteEmployeeAction from "@/action/deleteEmployeeAction";
import DeleteEmployeeDialog from "./delete-employee";

export default function EmployeesTable() {
    const [employeeIdFromButton, setEmployeeIdFromButton] = useState<string>("");

    const { isPending, error, data, refetch } = useQuery<[ResponseUsers]>({
        queryKey: ["users"],
        queryFn: async () => await getAllEmployeesAction(),
        refetchOnWindowFocus: "always",
        gcTime: 0
    });

    const { mutate, isPending: isDeleting } = useMutation({
        mutationKey: ["users"],
        mutationFn: async () => await deleteEmployeeAction(employeeIdFromButton),
        onSuccess: () => {
            refetch();
            toast.success("Success delete employee");
        }
    });

    const handleDeleteEmployee = async () => {
        mutate();
    };

    if (isPending) return <EmployeesTableSkeleton />;
    if (error) return "An error has occurred: " + error.message;


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[80px] text-center">Avatar</TableHead>
                    <TableHead className="w-[120px] text-center">Username</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Email</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Name</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Role</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Status</TableHead>
                    <TableHead className="w-[100px] text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            {/* table body */}
            <TableBody>
                {data.map((data, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <div className="w-full flex items-center justify-center">
                                <Image
                                    alt="Avatar"
                                    className="rounded-full object-cover"
                                    height="40"
                                    src="https://github.com/shadcn.png"
                                    style={{
                                        aspectRatio: "40/40",
                                        objectFit: "cover"
                                    }}
                                    width="40"
                                />
                            </div>
                        </TableCell>
                        <TableCell className="font-semibold text-center">{data.username}</TableCell>
                        <TableCell className="font-semibold text-center">{data.email}</TableCell>
                        <TableCell className="font-semibold text-center">{data.full_name}</TableCell>
                        <TableCell className="font-semibold text-center">{data.is_superuser === true ? "admin" : "user"}</TableCell>
                        <TableCell className="font-semibold text-center">{data.is_verified === true ? "Active" : "Inactive"}</TableCell>
                        <TableCell onClick={()=>{
                            setEmployeeIdFromButton(data.id);
                        }}>
                            <div className="w-full flex items-center justify-center space-x-2">
                                <Button className="w-6 h-6" size="icon" variant="outline" disabled={isDeleting}>
                                    <FileEditIcon className="w-4 h-4"/>
                                    <span className="sr-only">Edit</span>
                                </Button>
                                <DeleteEmployeeDialog deleteEmployee={handleDeleteEmployee} isDeleting={isDeleting} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
