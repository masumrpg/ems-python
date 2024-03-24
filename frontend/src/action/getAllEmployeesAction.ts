"use server";
import {auth} from "@/lib/auth";

const page = 1;
const pageSize = 10;
const selectedColumn = null;
const sortedColumn = null;
const filteredColumn = null;

export default async function getAllEmployeesAction() {
    const session = await auth();
    const url = process.env.NEXT_PUBLIC_API_URL + `/user`;
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });

        const resMsg = await res.json().then((value) => {
            return value;
        });
        console.log(resMsg)
        if (res.status === 200) {
            return resMsg;
        } else {
            return {message: "Getting data..."};
        }
    } catch (e) {
        return e;
    }
}