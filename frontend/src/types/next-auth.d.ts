import "next-auth"

declare module "next-auth" {
    interface User {
        id: string
        username: string
        full_name: string
        email: string
        is_superuser: boolean
        created_at: string
        refresh_token: string
        access_token: string
        expires_in: number
    }
    interface Session {
        user: User
        accessToken: string
    }
}
