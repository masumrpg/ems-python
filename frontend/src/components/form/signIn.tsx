"use client"
import {Button, Card, Divider, Flex, Text, TextInput, Title} from "@tremor/react";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {signInAction} from "@/server/action/signInAction";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";

const FormSchema = z.object({
    username: z
        .string()
        .min(1, "Username dibutuhkan")
        .regex(RegExp("^[a-z0-9_]+$"), "Hanya huruf kecil dan angka")
        .min(5, "Minimal 5 karakter"),
    password: z
        .string()
        .min(1, "Password dibutuhkan")
        .regex(RegExp("^[^ ]+$"), "Tidak boleh ada spasi")
        .min(8, "Password harus memiliki 8 karakter"),
});

type FormFields = z.infer<typeof FormSchema>;

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (formData: FormFields) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const error = await signInAction(formData);
        if (error) {
            toast.error(error.error);
        } else {
            toast.success("Berhasil masuk");
        }
    };
    return (
        <div>
            <Card>
                <Title className="justify-center">Masuk</Title>
                <Text className="mb-8">Silahkan masuk terlebih dahulu</Text>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <TextInput {...register("username")} placeholder="username"/>
                    {errors.username && (
                        <div className="text-red-500 text-sm">{errors.username.message}</div>
                    )}
                    <TextInput {...register("password")} placeholder="********" type="password"/>
                    {errors.password && (
                        <div className="text-red-500 text-sm">{errors.password.message}</div>
                    )}
                    <Button className="mt-3" loading={isSubmitting} type="submit">Masuk</Button>
                </form>
                <Divider>atau</Divider>
                <Text className="flex items-center justify-center">
                    Belum punya akun?
                    <Link className="text-[#3b82f6]" href="/dash">&nbsp;Daftar</Link>
                </Text>
            </Card>
        </div>
    )
}