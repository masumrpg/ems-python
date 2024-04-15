import {Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native"
import {StatusBar} from "expo-status-bar";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {FontAwesome6} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import {useRef, useState} from "react";
import Loading from "@/components/loading";
import CustomKeyboardView from "@/components/custom-keyboard-view";
import {useSession} from "@/auth/authCtx";

export default function SignIn() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {signIn} = useSession()

    const usernameRef = useRef<string>()
    const passwordRef = useRef<string>()

    const handleLogin = () => {
        setIsLoading(true)
        if (!usernameRef.current || !passwordRef.current) {
            Alert.alert("Sign In", "Please fill all the field")
            return;
        }

        signIn({
            username: usernameRef.current,
            password: passwordRef.current
        })

        setTimeout(function() {
            setIsLoading(false);
        }, 1000);
    }

    return (
        <CustomKeyboardView>
            <StatusBar style={"dark"} />
            <View style={{paddingTop: hp(8), paddingHorizontal: wp(5)}} className={"flex-1 gap-12"}>
                <View className={"items-center"}>
                    <Image style={{height: hp(25)}} resizeMode={"contain"} source={require("../assets/images/app/login.png")}/>
                </View>

                <View className={"gap-10"}>
                    <Text style={{fontSize: hp(4)}} className={"font-bold tracking-wider text-center text-neutral-800"}>
                        Sign In
                    </Text>
                    <View className={"gap-4"}>
                        <View style={{height: hp(7)}} className={"flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"}>
                            <FontAwesome6 name={"user"} size={hp(2.5)} color={"gray"} />
                            <TextInput
                                onChangeText={value => usernameRef.current = value}
                                style={{fontSize: hp(2)}}
                                className={"flex-1 font-semibold text-neutral-700"}
                                placeholder={"Username"}
                                placeholderTextColor={"gray"}
                            />
                        </View>
                        <View className={"gap-3"}>
                            <View style={{height: hp(7)}} className={"flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"}>
                                <FontAwesome6 name={"lock"} size={hp(2.5)} color={"gray"} />
                                <TextInput
                                    onChangeText={value => passwordRef.current = value}
                                    style={{fontSize: hp(2)}}
                                    className={"flex-1 font-semibold text-neutral-700"}
                                    placeholder={"Password"}
                                    secureTextEntry
                                    placeholderTextColor={"gray"}
                                />
                            </View>
                            <Text style={{fontSize: hp(1.8)}} className={"font-semibold text-right text-neutral-500"}>Forgot password?</Text>
                        </View>

                        {/*  Submit Button  */}
                        <View>
                            {
                                isLoading ? (
                                    <View className={"flex-row justify-center"}>
                                        <Loading size={hp(6.0)} />
                                    </View>
                                    ) : (
                                    <TouchableOpacity onPress={handleLogin} style={{height: hp(6.5)}} className={"bg-indigo-500 rounded-xl justify-center items-center"}>
                                        <Text style={{fontSize: hp(2.7)}} className={"text-white font-bold tracking-wider"}>
                                            Sign In
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>

                        {/*sign up button*/}
                        <View className={"flex-row justify-center"}>
                            <Text style={{fontSize: hp(1.8)}} className={"font-semibold text-neutral-500"}>Don't have an acconut? </Text>
                            <Pressable onPress={() => router.push("/sign-up")}>
                            <Text style={{fontSize: hp(1.8)}} className={"font-bold text-indigo-500"}>Sign Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    );
}