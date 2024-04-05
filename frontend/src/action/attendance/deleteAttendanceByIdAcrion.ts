"use server";
import {auth} from "@/lib/auth";

export default async function deleteAttendanceByIdAcrion(id:number) {
    const session = await auth();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/attendance/${id}`;

    try {
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${session?.accessToken}`
            }
        });

        return await res.json().then((value) => {
            return value;
        });
    } catch (e: any) {
        return e;
    }
}
