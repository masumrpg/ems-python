import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
import { toast } from "sonner";
import DeleteAttendance from "./delete-attendance";

export type Attendance = {
    id: number;
    user_id: string;
    full_name: string;
    check_in: string;
    check_out: string;
};

const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short", // Menghilangkan nama bulan
    day: "numeric",
    hour: "2-digit", // Format jam menjadi 24 jam
    minute: "2-digit",
    second: "2-digit",
    hour12: false // Menggunakan format 24 jam
};

export const columns: ColumnDef<Attendance>[] = [
    {
        accessorKey: "full_name",
        header: () => {
            return <p className={"text-center"}>Name</p>;
        },
        cell: ({ row }) => {
            const name = row.original.full_name;
            return <p className={"text-left"}>{name}</p>;
        }
    },
    {
        accessorKey: "check_in",
        header: () => {
            return <p className={"text-center"}>Check In</p>;
        },
        cell: ({ row }) => {
            const utcDateString = row.original.check_in;
            const utcDate = new Date(utcDateString);
            const localDate = utcDate.toLocaleString("id-ID", options);
            return (
                <div className={"flex justify-center items-center"}>
                    <Badge>
                        <p className={"text-center"}>{localDate}</p>
                    </Badge>
                </div>
            );
        }
    },
    {
        accessorKey: "check_out",
        header: () => {
            return <p className={"text-center"}>Check Out</p>;
        },
        cell: ({ row }) => {
            const utcDateString = row.original.check_out;
            const utcDate = new Date(utcDateString);
            const localDate = utcDate.toLocaleString("id-ID", options);
            return (
                <div className={"flex justify-center items-center"}>
                    <Badge variant={!utcDateString ? "destructive" : "default"}>
                        <p className={cn("text-center")}>
                            {!utcDateString ? "Hasn't come out yet" : localDate}
                        </p>
                    </Badge>
                </div>
            );
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const data = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                toast.message(data.id);
                            }}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <div
                            className={cn(
                                "relative flex cursor-pointer select-none hover:bg-muted items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            )}
                        >
                            <DeleteAttendance data={data} />
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
];
