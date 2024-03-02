export interface ResponseUsers {
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