export interface ResponseUsers {
    index_user: number;
    id: string;
    username: string;
    email: string;
    full_name: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    verified_at?: string | null;
    created_at?: string | null;
}

export interface UserFromApi {
    id: string;
    username: string;
    email: string;
    full_name: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    verified_at: string;
    created_at: string;
    user_detail: UserDetailFromApi | null;
}

export interface UserDetailFromApi {
    user_detail_id: number;
    address: AddressFromApi;
    phone: string;
    dob: string;
    gender: string;
    marital_status: string;
    id_card: string;
    religion: string;
    tertiary_education: string;
    job: string;
    salary: number;
}

export interface AddressFromApi {
    postal_code: string;
    village: string;
    subdistrict: string;
    city: string;
    province: string;
    country: string;
}

export interface DashboardProps {
    total_users: number
    active_users: number
}

export interface UserPaginationResponse {
    pagination: boolean;
    limit: number;
    page: number;
    columns?: string;
    sort?: string;
    filter_by?: string;
    filter_value?: string;
    total_row_in_page: number;
    total_records: number;
    from_total: number;
    total_pages: number;
    content?: ResponseUsers[];
}
