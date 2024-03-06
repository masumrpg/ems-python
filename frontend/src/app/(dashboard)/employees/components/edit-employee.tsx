"use client";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileEditIcon } from "lucide-react";
import DetailFormDialog from "./detail-form";
import getEmployeeByIdAction from "@/action/getEmployeeByIdAction";
import { useState } from "react";
import { UserFromApi } from "@/model/interface-client";

export default function EditEmployeeDialog({id,name,isDeleting}:{id:string,name:string,isDeleting: boolean}) {
    const [data, setData] = useState<UserFromApi | undefined>();
    const triggerHandler = async () => {
        const res = await getEmployeeByIdAction(id);
        setData(res);
    };
    console.log(data);
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button onClick={triggerHandler} className="w-6 h-6" size="icon" variant="outline" disabled={isDeleting}>
                    <FileEditIcon className="w-4 h-4"/>
                    <span className="sr-only">Edit</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-fit">
                <SheetHeader>
                    <SheetTitle className="text-center">{name}</SheetTitle>
                    <SheetDescription className="text-center">Add or edit employee!</SheetDescription>
                </SheetHeader>
                {!data ? <p>Loading...</p> : <DetailFormDialog id={id} data={data}/>}
            </SheetContent>
        </Sheet>
    );
};