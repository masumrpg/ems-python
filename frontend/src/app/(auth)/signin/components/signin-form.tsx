"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInAction } from "@/action/signInAction";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
    username: z
        .string()
        .min(1, "Username required")
        .regex(RegExp("^[a-z0-9_]+$"), "Only lowercase and number")
        .min(5, "Minimal 5 character"),
    password: z
        .string()
        .min(1, "Password required")
        .regex(RegExp("^[^ ]+$"), "No space")
        .min(8, "Password minimal 8 character")
});

type FormFields = z.infer<typeof FormSchema>;

export default function SignInForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const form = useForm<FormFields>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const onSubmit = async (formData: FormFields) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const error = await signInAction(formData, callbackUrl);
        if (error) {
            toast.error(error.error);
            setIsLoading(false);
        } else {
            toast.success("Signin success");
        }
    };
    return (
        <Card className={cn(
            "flex flex-col w-[25rem] my-16 border-0"
        )}>
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="*******"
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
                            {isLoading ? <ClipLoader size={25} /> : "Signin"}
                        </Button>
                    </form>
                    <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                        or
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        If you don&apos;t have an account yet, proceed
                        directly&nbsp;
                        <Link
                            className="text-blue-500 hover:underline"
                            href="/signup"
                        >
                            Signup
                        </Link>
                    </p>
                </Form>
            </CardContent>
        </Card>
    );
}
