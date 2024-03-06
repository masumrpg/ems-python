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
