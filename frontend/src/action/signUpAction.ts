"use server";

import {ResponseMessage} from "@/interface/interface-server";

export default async function signUpAction(formData: any) {
    const jsonData = JSON.stringify(formData);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/user`;
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: jsonData
        });
        const resMsg: ResponseMessage = await res.json().then((value) => {
            return value;
        });

        if (res.status === 201) {
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