import axios from "axios";

export default async function getAllUsersHook(session: any) {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/user`;
        const res = await axios.get(url,{
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });

        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
    } catch (e) {
        if (e) {
            return Response.json({
                "error": `Error ${e}`
            });
        }
    }
}