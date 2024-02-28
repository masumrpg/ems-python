import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const refreshTokenApiCall = async (token: any) => {
    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/refresh";
    const res = await fetch(url, {
        method: "POST",
        headers: {
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
        return {
            error: "RefreshTokenTokenError"
        };
    }
};

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            type: "credentials",
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
        // @ts-ignore
        async session({session, token}) {
            // @ts-ignore
            session.accessToken = token.accessToken;
            if (session?.accessToken ?? false) {
                const url = process.env.NEXT_PUBLIC_API_URL + "/user/me";
                const userRes = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${session?.accessToken}`
                    }
                });
                if (userRes.ok) {
                    session.user = await userRes.json();
                }
            }
            return session;
        }
    },
    pages: {
        signIn: "/signin"
    },
    debug: process.env.NODE_ENV === "development"
});
