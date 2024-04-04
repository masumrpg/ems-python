"use server";

import {auth} from "@/lib/auth";
import {ResponseMessage} from "@/interface/interface-server";

export default async function deleteEmployeeAction(id: string) {
    const session = await auth();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`;
    try {
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });
        const resMsg: ResponseMessage = await res.json().then((value) => {
            return value;
        });

        if (res.status === 200) {
            return {
                status: res.status,
                message: resMsg.message
            };
        } else {
            return {
                status: res.status,
                detail: resMsg.detail
            };
        }
    } catch (e) {
        return e;
    }
}