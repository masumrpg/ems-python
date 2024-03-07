import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";

interface ButtonProps {
    name: string
    deleteEmployee: () => Promise<void>
    isDeleting: boolean
}

export default function DeleteEmployeeDialog(
    {name, deleteEmployee, isDeleting } : ButtonProps) {

    const handleDeleteComfirm = () => {
        deleteEmployee();
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-6 h-6 bg-destructive" size="icon" variant="outline" disabled={isDeleting}>
                    <TrashIcon className="w-4 h-4"/>
                    <span className="sr-only">Delete</span>
                </Button>
            </DialogTrigger>
            <DialogClose>
                <DialogContent className="flex flex-col items-center justify-center sm:max-w-[250px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">{name}</DialogTitle>
                        <DialogDescription className="text-center">
                        Are you sure to delete this employee?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-row items-center justify-center space-x-5">
                        <Button onClick={handleDeleteComfirm} className="w-20" variant="destructive">Yes</Button>
                        <Button className="w-20" variant="outline">No</Button>
                    </div>
                </DialogContent>
            </DialogClose>
        </Dialog>
    );
};