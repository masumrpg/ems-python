"use server";
import {signOut} from "@/lib/auth";
import {AuthError} from "next-auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

export default async function signOutAction() {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await signOut({
            redirect: true,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
            case "SignOutError":
                return {error: "Failed to signout"};
            default:
                return {error: "Internal server error"};
            }
        }
        throw error;
    }
}