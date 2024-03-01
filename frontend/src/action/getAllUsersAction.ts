"use server";
import {auth} from "@/lib/auth";

export async function getAllUsersAction() {
    const session = await auth();
    try {
        const url = process.env.NEXT_PUBLIC_API_URL + "/user";
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });

        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
    } catch (e) {
        if (e) {
            return Response.json({
                "error": `Error ${e}`
            });
        }
    }
}