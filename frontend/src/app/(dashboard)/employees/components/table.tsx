"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileEditIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import EmployeesTableSkeleton from "./table-skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {useRouter} from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import deleteUserHook from "@/hooks/deleteUserHook";
import  getAllUsersHook  from "@/hooks/getAllUsersHook";

export default function EmployeesTable() {
    const session = useSession();
    const router = useRouter();
    const [idClicked, setIdClicked] = useState<string>("");
    const { data, isPending, isLoading, error, refetch} = useQuery({
        queryKey: ["user"],
        queryFn: async () => await getAllUsersHook(session.data)
        // refetchOnWindowFocus: "always",
        // gcTime: 0
    });
    const {mutate} = useMutation({
        mutationKey: ["user"],
        mutationFn: async () => await deleteUserHook(idClicked,session.data),
        onSuccess: () => toast.success("Success delete employee.")
    });

    if (data === undefined || null) {
        refetch();
        return <EmployeesTableSkeleton/>;
    }
    console.log(data[0]);

    if (isPending || isLoading) return <EmployeesTableSkeleton/>;

    if (error) return "An error has occurred: " + error.message;

    const editHabdler = () => {
        toast.success("OK");
    };

    const deleteHandler = () => {
        mutate();
        refetch();
        router.refresh();
    };


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
                {data.map((data: any, index: any) => (
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
                        <TableCell>
                            <div className="w-full flex items-center justify-center space-x-2">
                                <Button onClick={editHabdler} className="w-6 h-6" size="icon" variant="outline">
                                    <FileEditIcon className="w-4 h-4"/>
                                    <span className="sr-only">Edit</span>
                                </Button>
                                <Button onClick={() => {
                                    setIdClicked(data.id);
                                    deleteHandler();
                                }} className="w-6 h-6" size="icon" variant="outline">
                                    <TrashIcon className="w-4 h-4"/>
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
