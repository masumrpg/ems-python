"use server";
import {auth} from "@/lib/auth";

export async function getAllUserAction() {
    const session = await auth();
    try {
        const url = process.env.NEXT_PUBLIC_API_URL + "/user";
        const res: Response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });
        // return await res.json();
        return await res.json();
    } catch (error) {

    }
}