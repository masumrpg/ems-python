"use client";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import signUpAction from "@/action/signUpAction";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ResponseSignup {
    status: number;
    message?: string;
    detail?: string;
}

const formSchema = z
    .object({
        fullName: z
            .string()
            .min(1, "Full name required")
            .regex(
                RegExp("^[A-Z][a-z]+(?: [A-Z][a-z]+)?$"),
                "Without special characters or numbers"
            )
            .min(3, "Minimun 3 charcters")
            .max(200, "Max 200 charcters"),
        username: z
            .string()
            .min(1, "Username required")
            .regex(RegExp("^[a-z0-9_]+$"), "Lowercase only")
            .min(5, "Minimum 5 characters")
            .max(100, "Max 100 charcters"),
        email: z.string().min(1, "Email required").email(),
        password: z
            .string()
            .min(1, "Password required")
            .regex(RegExp("^[^ ]+$"), "Spaces are prohibited")
            .min(8, "Minimum 8 characters"),
        confirmPassword: z
            .string()
            .min(1, "Confirm password required")
            .regex(RegExp("^[^ ]+$"), "Spaces are prohibited")
            .min(8, "Minimum 8 characters")
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password not match!"
    });

export default function SignUpForm({
    hidden,
    add
}: {
    hidden?: string;
    add?: boolean;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    let buttonName = "";
    if (add === true) {
        buttonName = "Add Employee";
    } else {
        buttonName = "Signup";
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        const formData = {
            full_name: values.fullName,
            username: values.username,
            email: values.email,
            password: values.password
        };

        const res: ResponseSignup = (await signUpAction(
            formData
        )) as ResponseSignup;

        if (res.status === 201) {
            toast.success(res.message);
            setIsLoading(false);
            router.refresh();
        } else {
            toast.error(res.detail);
            setIsLoading(false);
        }
    };

    return (
        <Card className={cn("flex flex-col w-[25rem] my-16 border-0")}>
            <CardHeader>
                <CardTitle>Signin</CardTitle>
                <CardDescription>
                    Please log in to your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full"
                    >
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="username"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="example@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Retype Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="********"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            className="w-full mt-6"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <ClipLoader size={25} /> : buttonName}
                        </Button>
                    </form>
                    <div
                        className={cn(
                            "mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400",
                            hidden
                        )}
                    >
                        or
                    </div>
                    <p
                        className={cn(
                            "text-center text-sm text-gray-600 mt-2",
                            hidden
                        )}
                    >
                        If you have account, go here&nbsp;
                        <Link
                            className={cn(
                                "text-blue-500 hover:underline",
                                hidden
                            )}
                            href="/signin"
                        >
                            Signin
                        </Link>
                    </p>
                </Form>
            </CardContent>
        </Card>
    );
}
