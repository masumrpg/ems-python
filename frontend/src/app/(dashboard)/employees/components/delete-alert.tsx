"use client";
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
import {Button} from "@/components/ui/button";
import {ResponseUsers} from "@/interface/interface-client";
import deleteEmployeeAction from "@/action/deleteEmployeeAction";
import {TrashIcon} from "lucide-react";
import {toast} from "sonner";
import {ResponseMessage} from "@/interface/interface-server";
import {useRouter} from "next/navigation";
import {useState} from "react";

export function DeleteAlert({user}: { user: ResponseUsers }) {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const handlerDeleteUser = async () => {
        setLoading(true);
        const res: ResponseMessage = await deleteEmployeeAction(user.id) as ResponseMessage;
        if (res.message) {
            toast.success(res.message);
        } else {
            toast.error(res.detail);
        }
        router.refresh();
        setLoading(false);
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size={"icon"} className={"w-6 h-6"} variant={"destructive"} disabled={loading}>
                    <TrashIcon className="w-4 h-4"/>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure to delete <span className={"underline"}>{user.full_name}</span>?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handlerDeleteUser}
                        className={"bg-destructive hover:bg-red-400"}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
