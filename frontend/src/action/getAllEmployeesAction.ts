"use server";
import {auth} from "@/lib/auth";

export default async function getAllEmployeesAction() {
    const session = await auth();
    const url = process.env.NEXT_PUBLIC_API_URL + "/user";
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            },
            cache: "no-cache"
        });

        const resMsg = await res.json().then((value)=> {return value;});
        if (res.status === 200) {
            return resMsg;
        } else {
            return {message: "Getting data..."};
        }
    } catch (e) {
        return e;
    }
}