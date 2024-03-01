import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const maxAge = 24 * 60 * 60;

const refreshTokenApiCall = async (token: any) => {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL + "/auth/refresh";
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "refresh-token": token.refreshToken
            }
        });
        if (res.ok) {
            const data = await res.json();
            return {
                ...token,
                error: null,
                accessToken: data.access_token,
                refreshToken: data.refreshToken,
                expiresIn: (Date.now() + (parseInt(data.expires_in) * 1000) - 2000)
            };
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

};

const getMe = async (session: any) => {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL + "/user/me";
        const userRes = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session.accessToken}`
            },
            next: {revalidate: maxAge}
        });
        if (userRes.ok) {
            session.user = await userRes.json();
        } else {
            throw new Error(`Fetch error: ${userRes.status}`);
        }
    } catch (e) {
        if (e) {
            return Response.json({
                "error": `Error ${e}`
            });
        }
    }
};


export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    useSecureCookies: process.env.NODE_ENV === "production",
    secret: process.env.AUTH_SECRET,
    session: {
        maxAge: maxAge,
        strategy: "jwt",
        updateAge: maxAge / 2
    },
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            // eslint-disable-next-line no-unused-vars
            async authorize(credentials: any, req: Request) {
                const url = process.env.NEXT_PUBLIC_API_URL + "/auth/token";
                const formData = new URLSearchParams();
                formData.append("username", credentials.username);
                formData.append("password", credentials.password);

                const res = await fetch(url, {
                    method: "POST",
                    headers: {"Accept": "application/json"},
                    body: formData
                });
                if (res.ok) {
                    return await res.json();
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.refreshToken = user.refresh_token;
                token.accessToken = user.access_token;
                token.expiresIn = (Date.now() + (user.expires_in * 1000) - 2000);
            }

            if (Date.now() < token.expiresIn) {
                return token;
            }

            return await refreshTokenApiCall(token);
        },

        async session({session, token}) {
            session.accessToken = token.accessToken;

            if (session?.accessToken ?? false) {
                await getMe(session);
            }

            return session;
        }
    },
    pages: {
        signIn: "/signin"
    },
    debug: process.env.NODE_ENV === "development"
});
