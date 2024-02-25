"use server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

interface FormData {
    username: string
    password: string
}

export async function signInAction(formData:FormData) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await signIn("credentials", {
            username: formData.username,
            password: formData.password,
            redirectTo: "/",
        });
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin":
                    return {error: "Username atau password salah"};
                default:
                    return {error: "Internal server error"};
            }
        }
        throw error;
    }
};