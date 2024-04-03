import {Text, TouchableOpacity, View} from 'react-native';

import { useSession } from '@/auth/authCtx';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import Loading from "@/components/loading";
import axios from "axios";

export default function Index() {
    const { signOut, session } = useSession();
    const handleCheckIn = async () => {
        // const currentTime = new Date().toLocaleString();
        const currentTime = new Date().toISOString();
        console.log('Waktu Check-In:', currentTime);

        const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/user/attendance/`
        const checkIn = {
            "check_in": currentTime
        }
        const config = {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session}`,
            }
        };
        const data = await axios.post(url, checkIn, config)
            .then((response) => {
                console.log(response.data);
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

        console.log(data)
    };

    const handleCheckOut = async () => {
        // const currentTime = new Date().toLocaleString();
        const currentTime = new Date().toISOString();
        console.log('Waktu Check-In:', currentTime);

        const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/user/attendance/`
        const checkIn = {
            "check_out": currentTime
        }
        const config = {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session}`,
            }
        };
        const data = await axios.patch(url, checkIn, config)
            .then((response) => {
                console.log(response.data);
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

        console.log(data)
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity className={"bg-blue-500 px-4 py-2 rounded"} onPress={handleCheckIn}>
                <Text className={"text-white text-lg"}>Check-In</Text>
            </TouchableOpacity>

            <TouchableOpacity className={"pt-14 bg-blue-500 px-4 py-2 rounded"} onPress={handleCheckOut}>
                <Text className={"text-white text-lg"}>Check-Out</Text>
            </TouchableOpacity>

            <Text
                onPress={() => {
                    // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
                    signOut();
                }}>
                Sign Out
            </Text>
        </View>
    );
}
