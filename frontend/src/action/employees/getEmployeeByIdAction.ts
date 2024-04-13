"use server";
import { UserFromApi } from "@/interface/interface-client";
import {auth} from "@/lib/auth";


export default async function getEmployeeByIdAction(id:string): Promise<UserFromApi> {
    const session = await auth();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`;
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });

        return await res.json().then((value) => {
            return value;
        });

    } catch (e: any) {
        return e;
    }
}