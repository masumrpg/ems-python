"use client";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";


const formSchema = z
    .object({
        postalCode: z
            .string()
            .min(1, "Need postal code field")
            // .regex(RegExp("\d"), "Only number")
            .min(5, "Minimum 5 characters")
            .max(5, "Maximum 5 characters"),
        village: z
            .string()
            .min(1, "Need village field")
            .regex(RegExp("[A-Z][a-z]+(?: [A-Z][a-z]+)?"), "Non special char and number")
            .min(2, "Minimum 2 characters")
            .max(20, "Maximum 20 characters "),
        subdistrict: z
            .string()
            .min(1, "Need subdistric field")
            .regex(RegExp("[A-Z][a-z]+(?: [A-Z][a-z]+)?"), "Non special char and number")
            .min(4, "Minimum 4 characters")
            .max(20, "Minimum 20 characters"),
        city: z
            .string()
            .min(1, "Need city field")
            .regex(RegExp("[A-Z][a-z]+(?: [A-Z][a-z]+)?"), "Non special char and number")
            .min(4, "Minimum 4 characters")
            .max(25, "Minimum 25 characters"),
        province: z
            .string()
            .regex(RegExp("[A-Z][a-z]+(?: [A-Z][a-z]+)?"), "Non special char and number")
            .min(4, "Minimum 4 characters")
            .max(25, "Minimum 25 characters"),
        country: z
            .string()
            .regex(RegExp("[A-Z][a-z]+(?: [A-Z][a-z]+)?"), "Non special char and number")
            .min(4, "Minimum 4 characters")
            .max(25, "Minimum 25 characters"),
        phone: z
            .string()
            .min(1, "Need phone field")
            .regex(RegExp("\d"), "Only number")
            .min(4, "Minimum 4 characters")
            .max(20, "Maximum 20 characters"),
        dob: z.date(),
        gender: z
            .string()
            .min(1, "Need gender field")
            .regex(RegExp("[A-Z][a-z]+(?: [A-Z][a-z]+)?"), "Non special char and number")
            .min(4, "Minimum 4 characters")
            .max(20, "Maximum 20 characters"),
        maritalStatus: z
            .string()
            .min(1, "Need martial status field")
            .regex(RegExp("[A-Z][a-z]+(?: [A-Z][a-z]+)?"), "Non special char and number")
            .min(4, "Minimum 4 characters")
            .max(10, "Maximum 10 characters"),
        idCard: z
            .string()
            .min(1, "Need id card field")
            .regex(RegExp("\d"), "Only number")
            .min(16, "Minimum 16 characters")
            .max(16, "Maximum 16 characters"),
        religion: z
            .string()
            .min(1, "Need religion field")
            .regex(RegExp("[A-Z][a-z]+(?: [A-Z][a-z]+)?"), "Non special char and number")
            .min(4, "Minimum 4 characters")
            .max(20, "Maximum 20 characters"),
        tertiaryEducation: z
            .string()
            .min(1, "Need tertiary education field")
            .regex(RegExp("[A-Z][a-z]+(?: [A-Z][a-z]+)?"), "Non special char and number")
            .min(4, "Minimum 4 characters")
            .max(50, "Maximum 50 characters"),
        job: z
            .string()
            .min(1, "Need job field")
            .regex(RegExp("[A-Z][a-z]+(?: [A-Z][a-z]+)?"), "Non special char and number")
            .min(4, "Minimum 4 characters")
            .max(20, "Maximum 20 characters"),
        salary: z
            .number()
            .min(6, "Need salary field")
            .max(16, "Maximum 16 characters")
    });

export default function DetailFormDialog() {
    const [formStep, setFormStep] = useState(0);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            postalCode: "",
            village: "",
            subdistrict: "",
            city: "",
            province: "",
            country: "",
            phone: "",
            dob: new Date(),
            gender: "",
            maritalStatus: "",
            idCard: "",
            religion: "",
            tertiaryEducation: "",
            job: "",
            salary: 0
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = {
            username: values.username,
            password: values.password,
            name: values.name,
            dob: values.dob,
            village: values.village,
            rtRw: values.rtRw,
            phone: values.phone
        };
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="w-full"
                // className="flex flex-wrap justify-between"
            >
                <div className={cn("flex justify-between gap-6", {
                    hidden: formStep == 1
                })}>
                    <div className="w-1/2 space-y-2">
                        {/* address */}
                        <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="54366" {...field} />
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
                                        <Input
                                            placeholder="Serut"
                                            {...field}
                                        />
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
                                        <Input
                                            placeholder="Kuwarasan"
                                            {...field}
                                        />
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
                                        <Input placeholder="Kebumen" {...field} />
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
                                        <Input placeholder="Jawa Tengah" {...field} />
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
                                        <Input placeholder="Jawa Tengah" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* ========================================= */}
                <div className={cn("flex justify-between gap-6 top-0 left-0 right-0", {
                    hidden: formStep == 0
                })}>
                    <div className="w-1/2 space-y-2">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="085218939086" {...field} />
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
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pilih tanggal</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                classNames={{
                                                    caption_dropdowns: "flex",
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
                                                    date > new Date() || date < new Date("1900-01-01")
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
                                    <FormControl>
                                        <Input placeholder="Pria" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maritalStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Marital Status</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Lajang" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="idCard"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID Card</FormLabel>
                                    <FormControl>
                                        <Input placeholder="3309861064839991" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 space-y-2">
                        <FormField
                            control={form.control}
                            name="religion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Religion</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Islam" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tertiaryEducation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tertiary Education</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sarjana" {...field} />
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
                                    <FormLabel>Job</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Developer" {...field} />
                                    </FormControl>
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
                                        <Input placeholder="Rp. 5.000.000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        type="submit"
                        className={cn( {
                            hidden: formStep == 0
                        })}
                    >
                        Sign up
                    </Button>
                    <Button
                        type="button"
                        variant={"ghost"}
                        className={cn({
                            hidden: formStep == 1
                        })}
                        onClick={() => {
                            // validation
                            form.trigger(["postalCode", "village", "subdistrict", "city", "province", "country"]);
                            const postalState = form.getFieldState("postalCode");
                            const villageState = form.getFieldState("village");
                            const subdistrictState = form.getFieldState("subdistrict");
                            const cityState = form.getFieldState("city");
                            const provinceState = form.getFieldState("province");
                            const countryState = form.getFieldState("country");

                            if (!postalState.isDirty || postalState.invalid) return;
                            if (!villageState.isDirty || villageState.invalid) return;
                            if (!subdistrictState.isDirty || subdistrictState.invalid) return;
                            if (!cityState.isDirty || cityState.invalid) return;
                            if (!provinceState.isDirty || provinceState.invalid) return;
                            if (!countryState.isDirty || countryState.invalid) return;

                            setFormStep(1);
                        }}
                    >
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                        type="button"
                        variant={"ghost"}
                        onClick={() => {
                            setFormStep(0);
                        }}
                        className={cn({
                            hidden: formStep == 0
                        })}
                    >
                        Go Back
                    </Button>
                </div>
            </form>
        </Form>
    );
}