"use server";
import {UserPaginationResponse} from "@/interface/interface-client";
import {auth} from "@/lib/auth";

interface GetAllEmployeesActionProps {
    limit?: number;
}

export default async function getAllEmployeesAction({limit = 10}: GetAllEmployeesActionProps) {
    const session = await auth();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/attendance/?limit=${limit}`;

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${session?.accessToken}`
            }
        });

        return await res.json().then((value) => {
            return value;
        });
        // const resMsg = await res.json().then((value)=> {return value;});
        // if (res.status === 200) {
        //     return resMsg;
        // } else {
        //     return {message: "Getting data..."};
        // }
    } catch (e: any) {
        return e;
    }
}
