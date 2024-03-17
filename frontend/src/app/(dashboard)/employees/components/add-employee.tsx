"use client";
import SignUpForm from "@/app/(auth)/signup/components/signup-form";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

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
                <SignUpForm hidden="hidden" add={true}/>
            </DialogContent>
        </Dialog>
    );
};