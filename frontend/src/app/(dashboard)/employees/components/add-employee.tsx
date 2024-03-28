"use client";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import AddEmployeeForm from "./add-employee/add-employee-form";

export default function AddEmployeeDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto" size="sm">Add Employee</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] scale-90">
                <DialogHeader>
                    <DialogTitle className="text-center">Add Employee</DialogTitle>
                </DialogHeader>
                <AddEmployeeForm hidden="hidden" add={true}/>
            </DialogContent>
        </Dialog>
    );
};