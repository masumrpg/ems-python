import deleteAttendanceByIdAcrion from "@/action/attendance/deleteAttendanceByIdAcrion";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Attendance } from "./columns";
import { useRouter } from "next/navigation";

export default function DeleteAttendance({ data }: { data: Attendance }) {
    const router = useRouter();
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <p className="w-full text-red-600">Delete</p>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete {data.full_name} attendance?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async () => {
                            const res = await deleteAttendanceByIdAcrion(
                                data.id
                            );
                            if (res.message) {
                                toast.success(res.message);
                                router.refresh();
                            } else if (res.detail) {
                                toast.error(res.detail);
                            } else {
                                toast.error("Internal server error");
                            }
                        }}
                        className="bg-destructive hover:bg-red-400 dark:text-white"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
