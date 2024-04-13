"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import getEmployeeByIdAction from "@/action/employees/getEmployeeByIdAction";
import {useState} from "react";
import {ResponseUsers, UserFromApi} from "@/interface/interface-client";
import {useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import DetailFormSkeleton from "../../components/table/detail-form-skeleton";
import DetailFormDialog from "../../components/table/detail-form";

export default function EditDetails({user}: { user: ResponseUsers }) {
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
                <Button onClick={triggerHandler} variant={"outline"} className="ml-auto" size="sm">Edit Details</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-fit">
                <SheetHeader>
                    <SheetTitle className="text-center">{user.full_name}</SheetTitle>
                    <SheetDescription className="text-center">Edit employee!</SheetDescription>
                </SheetHeader>
                {!data ? <DetailFormSkeleton/> : <DetailFormDialog id={user.id} data={data}/>}
            </SheetContent>
        </Sheet>
    );
};