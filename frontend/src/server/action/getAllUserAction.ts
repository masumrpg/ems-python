"use server";
import {auth} from "@/lib/auth";
import { NextResponse } from "next/server";

export async function getAllUserAction() {
    const session = await auth();
    try {
        const url = process.env.NEXT_PUBLIC_API_URL + "/user";
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });

        return res.json();
    } catch (e) {
        return NextResponse.json({
            "error": `Error ${e}`
        });
    }
}