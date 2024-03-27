"use client";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { formSchemaDetailEmployee } from "@/validators/validators";
import addEmployeeDetailsAction from "@/action/addEmployeeDetailsAction";
import { UserFromApi } from "@/interface/interface-client";
import editEmployeeDetailsAction from "@/action/editEmployeeDetailsAction";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ResponseMessage } from "@/interface/interface-server";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export const genders = [
    { label: "Man", value: "Pria" },
    { label: "Women", value: "Wanita" }
] as const;

export const martialStatuses = [
    { label: "Single", value: "Lajang" },
    { label: "Married", value: "Menikah" }
] as const;

export const religions = [
    { label: "Islam", value: "Islam" },
    { label: "Protestant Christianity", value: "Kristen Protestan" },
    { label: "Catholic Christianity", value: "Kristen Katolik" },
    { label: "Hinduism", value: "Hindu" },
    { label: "Buddhism", value: "Buddha" },
    { label: "Confucianism", value: "Khonghucu" }
] as const;

export const jobs = [
    { label: "Production Operator", value: "Operator Produksi" },
    { label: "HRD", value: "HRD" },
    { label: "Administrator", value: "Admin" },
    { label: "Manager", value: "Manajer" },
    { label: "Developer", value: "Developer" }
] as const;

export default function DetailFormDialog({
    id,
    data
}: {
    id: string;
    data: UserFromApi;
}) {
    const [loadData, setLoadData] = useState<boolean>(false);

    const router = useRouter();
    const dobData = data?.user_detail?.dob
        ? new Date(data?.user_detail.dob)
        : new Date();
    const form = useForm<z.infer<typeof formSchemaDetailEmployee>>({
        resolver: zodResolver(formSchemaDetailEmployee),
        defaultValues: {
            postalCode: data?.user_detail?.address?.postal_code ?? "",
            village: data?.user_detail?.address.village ?? "",
            subdistrict: data?.user_detail?.address.subdistrict ?? "",
            city: data?.user_detail?.address.city ?? "",
            province: data?.user_detail?.address.province ?? "",
            country: data?.user_detail?.address.country ?? "",
            phone: data?.user_detail?.phone ?? "",
            dob: dobData ?? new Date(),
            gender: data?.user_detail?.gender ?? "",
            maritalStatus: data?.user_detail?.marital_status ?? "",
            idCard: data?.user_detail?.id_card ?? "",
            religion: data?.user_detail?.religion ?? "",
            tertiaryEducation: data?.user_detail?.tertiary_education ?? "",
            job: data?.user_detail?.job ?? "",
            salary: String(data?.user_detail?.salary) ?? 0
        }
    });

    const onSubmit = async (
        values: z.infer<typeof formSchemaDetailEmployee>
    ) => {
        const year = values.dob.getFullYear();
        const month = String(values.dob.getMonth() + 1).padStart(2, "0"); // Ditambah 1 karena bulan dimulai dari 0
        const day = String(values.dob.getDate()).padStart(2, "0");
        const formattedDOB = `${year}-${month}-${day}`;

        const formData = {
            address: {
                postal_code: values.postalCode,
                village: values.village,
                subdistrict: values.subdistrict,
                city: values.city,
                province: values.province,
                country: values.country
            },
            phone: values.phone,
            dob: formattedDOB,
            gender: values.gender,
            marital_status: values.maritalStatus,
            id_card: values.idCard,
            religion: values.religion,
            tertiary_education: values.tertiaryEducation,
            job: values.job,
            salary: parseInt(values.salary)
        };

        if (data.user_detail === null) {
            setLoadData(true);
            const res: ResponseMessage = (await addEmployeeDetailsAction(
                id,
                formData
            )) as ResponseMessage;
            if (res.status === 201) {
                toast.success(res.message);
                setLoadData(false);
            } else if (res.status === 500) {
                toast.error(res.detail);
                setLoadData(false);
            } else {
                toast.warning(res.detail);
                setLoadData(false);
            }
            router.refresh();
        } else {
            setLoadData(true);
            const res: ResponseMessage = (await editEmployeeDetailsAction(
                id,
                formData
            )) as ResponseMessage;
            if (res.status === 200) {
                toast.success(res.message);
                setLoadData(false);
            } else if (res.status === 500) {
                toast.error(res.detail);
                setLoadData(false);
            } else {
                toast.warning(res.detail);
                setLoadData(false);
            }
            router.refresh();
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="flex justify-between gap-6 mt-5">
                    <div className={cn("flex justify-between gap-6")}>
                        <div className="w-1/2 space-y-2">
                            {/* address */}
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="village"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Village</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subdistrict"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subdistrict</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-1/2 space-y-2">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="province"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Province</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* ========================================= */}
                    <div className={cn("flex justify-between gap-6")}>
                        <div className="w-1/2 space-y-2">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* dob */}
                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pilih tanggal
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    classNames={{
                                                        caption_dropdowns:
                                                            "flex",
                                                        dropdown:
                                                            "z-50 text-sm font-medium font overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                                                        dropdown_month:
                                                            "flex justify-between items-center gap-2 text-sm font-medium font",
                                                        dropdown_year:
                                                            "flex justify-between items-center gap-2 text-sm font-medium font",
                                                        dropdown_icon: "hidden",
                                                        vhidden: "hidden"
                                                    }}
                                                    captionLayout="dropdown-buttons"
                                                    fromYear={1945}
                                                    toYear={2025}
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        className="text-muted-foreground"
                                                        placeholder="Select gender"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {genders.map((gender) => {
                                                    return (
                                                        <SelectItem
                                                            value={gender.value}
                                                            key={gender.label}
                                                        >
                                                            {gender.label}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="maritalStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Martial Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        className="text-muted-foreground"
                                                        placeholder="Select martial status"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {martialStatuses.map(
                                                    (martialStatus) => {
                                                        return (
                                                            <SelectItem
                                                                value={
                                                                    martialStatus.value
                                                                }
                                                                key={
                                                                    martialStatus.label
                                                                }
                                                            >
                                                                {
                                                                    martialStatus.label
                                                                }
                                                            </SelectItem>
                                                        );
                                                    }
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-[200%]">
                                <FormField
                                    control={form.control}
                                    name="idCard"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ID Card</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="w-1/2 space-y-2">
                            <FormField
                                control={form.control}
                                name="religion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Religion</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        className="text-muted-foreground"
                                                        placeholder="Select religion"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {religions.map((religion) => {
                                                    return (
                                                        <SelectItem
                                                            value={
                                                                religion.value
                                                            }
                                                            key={religion.label}
                                                        >
                                                            {religion.label}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tertiaryEducation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Tertiary Education
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="job"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Role</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        className="text-muted-foreground"
                                                        placeholder="Select job"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {jobs.map((job) => {
                                                    return (
                                                        <SelectItem
                                                            value={job.value}
                                                            key={job.label}
                                                        >
                                                            {job.label}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="salary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Salary</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center mt-10">
                    <Button type="submit" disabled={loadData}>
                        {loadData === false ? (
                            "Add Details"
                        ) : (
                            <ClipLoader size={25} />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
