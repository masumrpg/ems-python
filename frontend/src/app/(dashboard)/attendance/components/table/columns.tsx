import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Attendance = {
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
                    <Badge variant={!utcDateString ? "outline" : "destructive"}>
                        <p
                            className={cn(
                                "text-center",
                                !utcDateString ? "text-red-600" : ""
                            )}
                        >
                            {!utcDateString ? "Hasn't come out yet" : localDate}
                        </p>
                    </Badge>
                </div>
            );
        }
    }
];
