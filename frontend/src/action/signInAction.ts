"use server";
import {signIn} from "@/lib/auth";
import {AuthError} from "next-auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

interface FormData {
    username: string
    password: string
}

export async function signInAction(formData: FormData, callbackUrl?: string | null | undefined) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await signIn("credentials", {
            username: formData.username,
            password: formData.password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        });
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
            case "CredentialsSignin":
                return {error: "Username or password incorrect"};
            default:
                return {error: "Internal server error"};
            }
        }
        throw error;
    }
}