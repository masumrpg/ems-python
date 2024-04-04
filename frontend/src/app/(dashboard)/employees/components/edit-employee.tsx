"use client";
import {Button} from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {FileEditIcon} from "lucide-react";
import DetailFormDialog from "./detail-form";
import getEmployeeByIdAction from "@/action/employees/getEmployeeByIdAction";
import {useState} from "react";
import {ResponseUsers, UserFromApi} from "@/interface/interface-client";
import {useRouter} from "next/navigation";
import DetailFormSkeleton from "./detail-form-skeleton";

export default function EditEmployeeDialog({user}: { user: ResponseUsers }) {
    const router = useRouter();
    const [data, setData] = useState<UserFromApi | undefined>();
    const triggerHandler = async () => {
        const res = await getEmployeeByIdAction(user.id);
        setData(res);
        router.refresh();
    };
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button onClick={triggerHandler} className="w-6 h-6" size="icon" variant="outline"
                    disabled={false}>
                    <FileEditIcon className="w-4 h-4"/>
                    <span className="sr-only">Edit</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-fit">
                <SheetHeader>
                    <SheetTitle className="text-center">{user.full_name}</SheetTitle>
                    <SheetDescription className="text-center">Add or edit employee!</SheetDescription>
                </SheetHeader>
                {!data ? <DetailFormSkeleton/> : <DetailFormDialog id={user.id} data={data}/>}
            </SheetContent>
        </Sheet>
    );
};