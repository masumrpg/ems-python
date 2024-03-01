import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileEditIcon, TrashIcon } from "lucide-react";
import React from "react";

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
                <TableRow>
                    {/* avatar cell */}
                    <TableCell>
                        <div className="w-full flex items-center justify-center">
                            <Skeleton className="w-[40px] h-[40px] rounded-full" />
                        </div>
                    </TableCell>
                    <TableCell className="">
                        <div className="w-full flex items-center justify-center">
                            <Skeleton className="w-full h-3 rounded-md"/>
                        </div>
                    </TableCell>
                    <TableCell >
                        <div className="w-full flex items-center justify-center">
                            <Skeleton className="w-full h-3 rounded-md"/>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="w-full flex items-center justify-center">
                            <Skeleton className="w-full h-3 rounded-md"/>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="w-full flex items-center justify-center">
                            <Skeleton className="w-full h-3 rounded-md"/>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="w-full flex items-center justify-center">
                            <Skeleton className="w-full h-3 rounded-md"/>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="w-full flex items-center justify-center space-x-2">
                            <Button className="w-6 h-6" size="icon" variant="outline">
                                <FileEditIcon className="w-4 h-4"/>
                                <span className="sr-only">Edit</span>
                            </Button>
                            <Button className="w-6 h-6" size="icon" variant="outline">
                                <TrashIcon className="w-4 h-4"/>
                                <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
