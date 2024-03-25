"use server";
import { auth } from "@/lib/auth";

const pagination = true;
const limit = 10;
const page = 1;
const columns = "id,username";
const sort = "username";
const filterBy = "username";
const filterValue = "ma";


export default async function getAllEmployeesAction() {
    const session = await auth();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user?pagination=${pagination}&limit=${limit}&page=${page}&columns=${columns}&sort=${sort}&filter_by=${filterBy}&filter_value=${filterValue}`;
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${session?.accessToken}`
            }
        });

        const resMsg = await res.json().then((value) => {
            return value;
        });

        console.log(resMsg);


        if (res.status === 200) {
            return resMsg;
        } else {
            return { message: "Getting data..." };
        }
    } catch (e) {
        return e;
    }
}
