import React, {useState} from 'react';
import { useStorageState } from '@/storage/useStorageState';
import axios from "axios";
import {useRouter} from "expo-router";
import {ToastAndroid} from "react-native";

interface SignInProps {
    username: string
    password: string
}

interface DataResponse {
    access_token: string,
    refresh_token: string,
    token_type: string,
    expires_in: number
}

const AuthContext = React.createContext<{
    signIn: ({username, password}: SignInProps) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const router = useRouter();
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: async ({username, password}: SignInProps) => {
                    const postData = {
                        username: username,
                        password: password
                    }
                    // Konfigurasi untuk permintaan POST
                    const config = {
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded' // Header untuk menentukan tipe konten permintaan
                        }
                    };

                    // TODO ini masih belum tertangani errornya
                    const data: DataResponse = await axios.post(`${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/token`, postData, config)
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            if (error.response) {
                                // Tangani kesalahan dari respons
                                console.error('Error response:', error.response.data);
                                throw error.response.data; // Melempar kembali error respons
                            } else if (error.request) {
                                // Tangani kesalahan tanpa respons
                                console.error('No response received:', error.request);
                                throw 'No response received'; // Melempar kembali pesan kesalahan
                            } else {
                                // Kesalahan lainnya
                                console.error('Error:', error.message);
                                throw error.message; // Melempar kembali pesan kesalahan
                            }
                        });

                    setSession(data.access_token);
                    router.replace("/");
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}
