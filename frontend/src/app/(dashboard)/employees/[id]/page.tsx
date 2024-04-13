import Link from "next/link";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { CornerDownRight, ChevronLeftIcon, UserIcon } from "lucide-react";
import getEmployeeByIdAction from "@/action/employees/getEmployeeByIdAction";
import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import EditDetails from "./components/edit-details";

export default async function EmployeeDetailsPage({
    params
}: {
    params: { id: string };
}) {
    const data = await getEmployeeByIdAction(params.id);

    if (!data) return <Loading />;

    const salary = data.user_detail?.salary;
    const formattedSalary = formatRupiah(salary || 0);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {/* Back button */}
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
                                <span>{data.id}</span>
                            </div>
                        </div>
                    </div>
                    {/* Edit Button */}
                    <div className="flex items-center justify-end">
                        <EditDetails user={data} />
                    </div>
                </div>
            </div>
            {/* Content */}
            <div className="border shadow-sm rounded-lg">
                <div className="flex flex-1 flex-col gap-4 p-4 md:p-10">
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="w-full">
                            <CardHeader className="px-4 py-2 font-bold">
                                Acconut Information
                            </CardHeader>
                            <CardContent className="grid gap-2 p-4">
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        ID
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} /> {data.id}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Username
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.username}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Email
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.email}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Status
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        {data.is_active ? (
                                            <>
                                                <CornerDownRight size={20} />
                                                <Badge variant={"default"}>
                                                    Active
                                                </Badge>
                                            </>
                                        ) : (
                                            <>
                                                <CornerDownRight size={20} />
                                                <Badge variant={"destructive"}>
                                                    Inactive
                                                </Badge>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Role
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.job}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Acconut
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.is_superuser ? (
                                            <p>Admin</p>
                                        ) : (
                                            <p>User</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full">
                            <CardHeader className="px-4 py-2 font-bold">
                                Personal Information
                            </CardHeader>
                            <CardContent className="grid gap-2 p-4">
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Full Name
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.full_name}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Phone
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.phone}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Date of Birth
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.dob}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Gender
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.gender}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Marital Status
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.marital_status}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        ID Card
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.id_card}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Religion
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.religion}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Tertiary Education
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.tertiary_education}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Salary
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {formattedSalary}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full">
                            <CardHeader className="px-4 py-2 font-bold">
                                Address Information
                            </CardHeader>
                            <CardContent className="grid gap-2 p-4">
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Postal Code
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.address.postal_code}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Village
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.address.village}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Subdistrict
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.address.subdistrict}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        City
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.address.city}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Province
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.address.province}
                                    </div>
                                </div>
                                <div className="grid gap-1.5">
                                    <h3 className="text-sm font-semibold">
                                        Country
                                    </h3>
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CornerDownRight size={20} />{" "}
                                        {data.user_detail?.address.country}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}

function formatRupiah(angka: number) {
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });

    return formatter.format(angka);
}
