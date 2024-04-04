"use server";
import { UserPaginationResponse } from "@/interface/interface-client";
import { auth } from "@/lib/auth";

interface GetAllEmployeesActionProps {
    pagination?: boolean;
    limit?: number;
    page?: number;
    columns?: string | null;
    sort?: string | null;
    filterBy?: string | null;
    filterValue?: string | null;
}

export default async function getAllEmployeesAction({
    pagination = true,
    limit = 10,
    page = 1,
    columns = "",
    sort = "",
    filterBy = "",
    filterValue = ""
}: GetAllEmployeesActionProps): Promise<UserPaginationResponse> {
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

        return await res.json().then((value) => {
            return value;
        });
    } catch (e:any) {
        return e;
    }
}
