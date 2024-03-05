import SignUpForm from "@/app/(auth)/signup/components/signup-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
            <DialogContent className="sm:max-w-[425px] scale-[87%]">
                <DialogHeader>
                    <DialogTitle>Add Employee</DialogTitle>
                    <DialogDescription>
                        Add more employee.
                    </DialogDescription>
                </DialogHeader>
                <SignUpForm hidden="hidden" add={true}/>
            </DialogContent>
        </Dialog>
    );
};