"use server";
import {auth} from "@/lib/auth";

export default async function getEmployeeByIdAction(id:string) {
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