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
    deleteEmployee: () => Promise<void>
    isDeleting: boolean
  }

export default function DeleteEmployeeDialog(
    {deleteEmployee, isDeleting } : ButtonProps) {

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
                <DialogContent className="sm:max-w-[280px]">
                    <DialogHeader>
                        <DialogTitle>Delete Employee</DialogTitle>
                        <DialogDescription>
                        Are you sure to delete employee?
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