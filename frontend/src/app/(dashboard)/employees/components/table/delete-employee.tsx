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
import {
    ResponseMessageClient,
    ResponseUsers
} from "@/interface/interface-client";
import deleteEmployeeAction from "@/action/employees/deleteEmployeeAction";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";

export function DeleteEmployee({user}: { user: ResponseUsers }) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const handlerDeleteUser = async () => {
        const res: ResponseMessageClient = (await deleteEmployeeAction(
            user.id
        )) as ResponseMessageClient;
        if (res.message) {
            toast.success(res.message);
        } else {
            toast.error(res.detail);
        }
        await queryClient.refetchQueries({queryKey: ["employees"]});
        router.refresh();
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <p className="w-full text-red-600">Delete</p>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete{" "}
                        <span className={"underline"}>{user.full_name}</span>?
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
                        onClick={handlerDeleteUser}
                        className="bg-destructive hover:bg-red-400 dark:text-white"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
