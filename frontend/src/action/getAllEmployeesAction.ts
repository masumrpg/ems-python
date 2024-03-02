"use server";
import {auth} from "@/lib/auth";

export default async function getAllEmployeesAction() {
    const session = await auth();
    try {
        const url = process.env.NEXT_PUBLIC_API_URL + "/user";
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            },
            cache: "no-cache"
        });

        if (res.ok) {
            return await res.json();
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