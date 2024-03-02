"use server";

import { auth } from "@/lib/auth";

export default async function getAllEmployeesAction(id:string) {
    const session = await auth();
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`;
        const res = await fetch(url,{
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            }
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