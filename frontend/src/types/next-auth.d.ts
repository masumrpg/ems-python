import "@auth/core/jwt";
import { SessionBase, Session } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

export interface CustomSession extends SessionBase {
    user: AdapterUser;
    accessToken: any;
}

// declare module "@auth/core/jwt" {
//     interface JWT {
//         expiresIn: number;
//         accessToken: string;
//         refreshToken: string
//         tokenType: string
//     }
// }

declare module "next-auth" {
    interface User {
        id: string
        username: string
        email: string
        full_name: string
        is_active: boolean
        is_superuser: boolean
        is_verified: boolean
        verified_at: string
        created_at: string
        refresh_token: string
        access_token: string
        expires_in: number
    }
    interface Session {
        user: User
    }

    interface Session extends CustomSession {}
}
