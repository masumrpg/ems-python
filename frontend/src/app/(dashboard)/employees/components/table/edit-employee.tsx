"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import DetailFormDialog from "./detail-form";
import getEmployeeByIdAction from "@/action/employees/getEmployeeByIdAction";
import {useState} from "react";
import {ResponseUsers, UserFromApi} from "@/interface/interface-client";
import {useRouter} from "next/navigation";
import DetailFormSkeleton from "./detail-form-skeleton";

export default function EditEmployeeSheet({user}: { user: ResponseUsers }) {
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
                <p onClick={triggerHandler}>
                    Edit details
                </p>
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