import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";


export default function DetailFormSkeleton() {
    return (
        <div className="w-full">
            <div className="flex justify-between gap-6 mt-5">
                <div className={cn("flex justify-between gap-6")}>
                    <div className="w-1/2 space-y-2">
                        {/* address */}
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                    </div>
                    <div className="w-1/2 space-y-2">
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                    </div>
                </div>

                {/* ========================================= */}
                <div className={cn("flex justify-between gap-6")}>
                    <div className="w-1/2 space-y-2">
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                        <div className="w-[200%] space-y-2">
                            <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                            <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                        </div>
                    </div>
                    <div className="w-1/2 space-y-2">
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                        <Skeleton className="w-[100px] h-[17px] rounded-md"/>
                        <Skeleton className="w-[200px] h-[40px] rounded-md"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-10">
                <Skeleton className="w-[100px] h-[35px] rounded-md"/>
            </div>
        </div>
    );
}
