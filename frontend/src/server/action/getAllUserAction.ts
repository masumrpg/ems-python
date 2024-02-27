"use server"
import { auth } from "@/lib/auth";

export interface ResponseUsers{
  id: string
  username: string
  email: string
  full_name: string
  is_active: boolean
  is_superuser: boolean
  is_verified: boolean
  verified_at: string | null
  created_at: string | null;
}

export default async function getUsersAction() {
  const session = await auth()
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + '/users';
    const res = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${session?.accessToken}`
        },
    });
    const data = await res.json();
    return data;
  } catch (error) {

  }
}