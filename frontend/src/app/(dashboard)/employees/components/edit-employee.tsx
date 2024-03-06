import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { FileEditIcon } from "lucide-react";
import DetailFormDialog from "./detail-form";

export default function EditEmployeeDialog({name,isDeleting}:{name:string,isDeleting: boolean}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-6 h-6" size="icon" variant="outline" disabled={isDeleting}>
                    <FileEditIcon className="w-4 h-4"/>
                    <span className="sr-only">Edit</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-fit">
                <DialogHeader>
                    <DialogTitle className="text-center">{name}</DialogTitle>
                </DialogHeader>
                <DetailFormDialog />
            </DialogContent>
        </Dialog>
    );
};