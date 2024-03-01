import axios from "axios";

export default async function deleteUserHook(id:string, session: any) {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`;
        const res = await axios.delete(url,{
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });
        if (res.status === 200) {
            return res;
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