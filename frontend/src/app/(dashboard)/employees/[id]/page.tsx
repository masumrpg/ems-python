import Link from "next/link";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { ChevronLeftIcon, UserIcon } from "lucide-react";
import getEmployeeByIdAction from "@/action/employees/getEmployeeByIdAction";
import Loading from "@/app/loading";

export default async function EmployeeDetailsPage({
    params
}: {
    params: { id: string };
}) {
    const data = await getEmployeeByIdAction(params.id);
    if (!data) return <Loading />;

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="container px-4 md:px-6">
                <div className="flex items-center space-x-4">
                    <Link
                        className="flex items-center text-sm font-medium leading-0.5 transition-colors hover:underline"
                        href="/employees"
                    >
                        <ChevronLeftIcon className="w-4 h-4 mr-1.5" />
                        Back to Employees
                    </Link>
                </div>
            </div>
            <div className="flex items-center">
                <div className="container grid max-w-3xl items-start px-4 gap-4 sm:gap-8 md:px-6 lg:max-w-5xl lg:grid-cols-2 lg:gap-12">
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16 border">
                            <AvatarImage
                                alt="User avatar"
                                className="border-2"
                                src="/placeholder.svg"
                            />
                        </Avatar>
                        <div className="grid gap-1.5">
                            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl">
                                {data.full_name}
                            </h1>
                            <div className="flex items-center gap-2 text-sm">
                                <UserIcon className="w-4 h-4 mr-1.5" />
                                <span>{data.username}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        {/* TODO Belum di implement */}
                        <Button size="lg" variant="outline">
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>
            <div className="border shadow-sm rounded-lg">
                <div className="flex flex-1 flex-col gap-4 p-4 md:p-10">
                    <Card>
                        <CardHeader className="px-4 py-2">
                            Personal Information
                        </CardHeader>
                        <CardContent className="grid gap-2 p-4">
                            <div className="grid gap-1.5">
                                <div className="text-sm font-medium">Email</div>
                                <div>{data.email}</div>
                            </div>
                            <div className="grid gap-1.5">
                                <div className="text-sm font-medium">Phone</div>
                                <div>{data.user_detail?.phone}</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="px-4 py-2">
                            Company Information
                        </CardHeader>
                        <CardContent className="grid gap-2 p-4">
                            <div className="grid gap-1.5">
                                <div className="text-sm font-medium">Role</div>
                                <div>{data.user_detail?.job}</div>
                            </div>
                            <div className="grid gap-1.5">
                                <div className="text-sm font-medium">
                                    Religion
                                </div>
                                <div>{data.user_detail?.religion}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
