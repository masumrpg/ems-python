"use server";

import { auth } from "@/lib/auth";
import { ResponseMessage } from "@/interface/interface-server";

export default async function addEmployeeDetailsAction(
    id: string,
    formData: any
) {
    const session = await auth();
    const jsonData = JSON.stringify(formData);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/detail/${id}`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json"
            },
            body: jsonData,
            next: { revalidate: false }
        });
        const resMsg: ResponseMessage = await res.json().then((value) => {
            return value;
        });


        if (res.status === 201) {
            return {
                status: res.status,
                message: resMsg.message
            };
        } else if (res.status === 500) {
            return {
                status: res.status,
                detail: "Internal server error"
            };
        } else if (res.status === 422) {
            return {
                status: res.status,
                detail: resMsg.detail?.[0]?.msg
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
