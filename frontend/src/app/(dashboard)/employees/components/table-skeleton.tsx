import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileEditIcon, TrashIcon } from "lucide-react";
import React from "react";

const skeletonData = [
    {
        avatar: <Skeleton className="w-[40px] h-[40px] rounded-full" />,
        username: <Skeleton className="w-full h-3 rounded-md"/>,
        email: <Skeleton className="w-full h-3 rounded-md"/>,
        name: <Skeleton className="w-full h-3 rounded-md"/>,
        role: <Skeleton className="w-full h-3 rounded-md"/>,
        status: <Skeleton className="w-full h-3 rounded-md"/>,
        actions: <Skeleton className="w-full h-3 rounded-md"/>
    },
    {
        avatar: <Skeleton className="w-[40px] h-[40px] rounded-full" />,
        username: <Skeleton className="w-full h-3 rounded-md"/>,
        email: <Skeleton className="w-full h-3 rounded-md"/>,
        name: <Skeleton className="w-full h-3 rounded-md"/>,
        role: <Skeleton className="w-full h-3 rounded-md"/>,
        status: <Skeleton className="w-full h-3 rounded-md"/>,
        actions: <Skeleton className="w-full h-3 rounded-md"/>
    },
    {
        avatar: <Skeleton className="w-[40px] h-[40px] rounded-full" />,
        username: <Skeleton className="w-full h-3 rounded-md"/>,
        email: <Skeleton className="w-full h-3 rounded-md"/>,
        name: <Skeleton className="w-full h-3 rounded-md"/>,
        role: <Skeleton className="w-full h-3 rounded-md"/>,
        status: <Skeleton className="w-full h-3 rounded-md"/>,
        actions: <Skeleton className="w-full h-3 rounded-md"/>
    },
    {
        avatar: <Skeleton className="w-[40px] h-[40px] rounded-full" />,
        username: <Skeleton className="w-full h-3 rounded-md"/>,
        email: <Skeleton className="w-full h-3 rounded-md"/>,
        name: <Skeleton className="w-full h-3 rounded-md"/>,
        role: <Skeleton className="w-full h-3 rounded-md"/>,
        status: <Skeleton className="w-full h-3 rounded-md"/>,
        actions: <Skeleton className="w-full h-3 rounded-md"/>
    },
    {
        avatar: <Skeleton className="w-[40px] h-[40px] rounded-full" />,
        username: <Skeleton className="w-full h-3 rounded-md"/>,
        email: <Skeleton className="w-full h-3 rounded-md"/>,
        name: <Skeleton className="w-full h-3 rounded-md"/>,
        role: <Skeleton className="w-full h-3 rounded-md"/>,
        status: <Skeleton className="w-full h-3 rounded-md"/>,
        actions: <Skeleton className="w-full h-3 rounded-md"/>
    },
    {
        avatar: <Skeleton className="w-[40px] h-[40px] rounded-full" />,
        username: <Skeleton className="w-full h-3 rounded-md"/>,
        email: <Skeleton className="w-full h-3 rounded-md"/>,
        name: <Skeleton className="w-full h-3 rounded-md"/>,
        role: <Skeleton className="w-full h-3 rounded-md"/>,
        status: <Skeleton className="w-full h-3 rounded-md"/>,
        actions: <Skeleton className="w-full h-3 rounded-md"/>
    },
    {
        avatar: <Skeleton className="w-[40px] h-[40px] rounded-full" />,
        username: <Skeleton className="w-full h-3 rounded-md"/>,
        email: <Skeleton className="w-full h-3 rounded-md"/>,
        name: <Skeleton className="w-full h-3 rounded-md"/>,
        role: <Skeleton className="w-full h-3 rounded-md"/>,
        status: <Skeleton className="w-full h-3 rounded-md"/>,
        actions: <Skeleton className="w-full h-3 rounded-md"/>
    }
];

export default function EmployeesTableSkeleton() {
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
                {skeletonData.map((data,index)=>(
                    <TableRow key={index}>
                        {/* avatar cell */}
                        <TableCell>
                            <div className="w-full flex items-center justify-center">
                                {data.avatar}
                            </div>
                        </TableCell>
                        {/* username */}
                        <TableCell className="">
                            <div className="w-full flex items-center justify-center">
                                {data.username}
                            </div>
                        </TableCell>
                        {/* email */}
                        <TableCell >
                            <div className="w-full flex items-center justify-center">
                                {data.email}
                            </div>
                        </TableCell>
                        {/* name */}
                        <TableCell>
                            <div className="w-full flex items-center justify-center">
                                {data.name}
                            </div>
                        </TableCell>
                        {/* role */}
                        <TableCell>
                            <div className="w-full flex items-center justify-center">
                                {data.role}
                            </div>
                        </TableCell>
                        {/* status */}
                        <TableCell>
                            <div className="w-full flex items-center justify-center">
                                {data.status}
                            </div>
                        </TableCell>
                        {/* action */}
                        <TableCell>
                            <div className="w-full flex items-center justify-center space-x-2">
                                <Button className="w-6 h-6" size="icon" variant="outline" disabled={true}>
                                    <FileEditIcon className="w-4 h-4"/>
                                    <span className="sr-only">Edit</span>
                                </Button>
                                <Button className="w-6 h-6 bg-destructive" size="icon" variant="outline" disabled={true}>
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
