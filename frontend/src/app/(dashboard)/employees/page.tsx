import {Button} from "@/components/ui/button";
import {TableHead, TableRow, TableHeader, TableCell, TableBody, Table} from "@/components/ui/table";
import {FileEditIcon, TrashIcon} from "lucide-react";
import {toast} from "sonner";
import {getAllUserAction} from "@/server/action/getAllUserAction";
import Image from "next/image";
import { ResponseUsers } from "@/model/interface";
import {useQuery} from "react-query";

const tableData = [
    {
        avatarSrc: "https://github.com/shadcn.png",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "Manager"
    },
    {
        avatarSrc: "https://github.com/shadcn.png",
        name: "Bob Smith",
        email: "bob@example.com",
        role: "Developer"
    },
    {
        avatarSrc: "https://github.com/shadcn.png",
        name: "Eva Williams",
        email: "eva@example.com",
        role: "Designer"
    },
    {
        avatarSrc: "https://github.com/shadcn.png",
        name: "Mark Davis",
        email: "mark@example.com",
        role: "Intern"
    }
];

const fetchUsers = async () => {
    const response = await getAllUserAction();
    if (!response) {
        throw new Error("Failed load data!");
    }
    return response.json();
};

const ok = async() =>{
    const res = await getAllUserAction();
    return res;
};

export default function EmployeesPage() {


    const data = false;

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Employees</h1>
                <Button className="ml-auto" size="sm">
                    Add employee
                </Button>
            </div>
            <div className="border shadow-sm rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Avatar</TableHead>
                            <TableHead className="max-w-[150px]">Username</TableHead>
                            <TableHead className="hidden md:table-cell">Email</TableHead>
                            <TableHead className="hidden md:table-cell">Name</TableHead>
                            <TableHead className="hidden md:table-cell">Role</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* batas*/}
                    {!data ? (
                        <TableBody>
                            <TableRow>
                                <TableCell>
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
                                </TableCell>
                                <TableCell className="font-semibold">Loading...</TableCell>
                                <TableCell className="hidden md:table-cell">Loading...</TableCell>
                                <TableCell>Loading...</TableCell>
                                <TableCell className="flex gap-2 w-[100px]">
                                    <Button className="w-6 h-6" size="icon" variant="outline">
                                        <FileEditIcon className="w-4 h-4"/>
                                        <span className="sr-only">Edit</span>
                                    </Button>
                                    <Button className="w-6 h-6" size="icon" variant="outline">
                                        <TrashIcon className="w-4 h-4"/>
                                        <span className="sr-only">Delete</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <TableBody>
                            {data.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell>
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
                                    </TableCell>
                                    <TableCell className="font-semibold">{data.username}</TableCell>
                                    <TableCell className="font-semibold">{data.email}</TableCell>
                                    <TableCell className="font-semibold">{data.full_name}</TableCell>
                                    <TableCell className="hidden md:table-cell">{data.is_superuser}</TableCell>
                                    <TableCell>{data.is_verified}</TableCell>
                                    <TableCell className="flex gap-2 w-[100px]">
                                        <Button className="w-6 h-6" size="icon" variant="outline">
                                            <FileEditIcon className="w-4 h-4"/>
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                        <Button className="w-6 h-6" size="icon" variant="outline">
                                            <TrashIcon className="w-4 h-4"/>
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}

                </Table>
            </div>
        </main>
    );
}


