import {Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native"
import {StatusBar} from "expo-status-bar";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {AntDesign, FontAwesome6, Octicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import {useRef, useState} from "react";
import Loading from "@/components/loading";
import CustomKeyboardView from "@/components/custom-keyboard-view";

export default function SignUp() {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const fullNameRef = useRef<string>()
    const usernameRef = useRef<string>()
    const emailRef = useRef<string>()
    const passwordRef = useRef<string>()
    const confirmPasswordRef = useRef<string>()

    const handleRegister = async () => {
        if (!usernameRef.current || !passwordRef.current || !fullNameRef.current || !emailRef.current || !passwordRef.current) {
            Alert.alert("Sign Up", "Please fill all the field")
            return;
        }
        if (passwordRef.current !== confirmPasswordRef.current) {
            Alert.alert("Password do not match!", "Please retype the password and confirm password tobe same")
            return;
        }
        // register logic
        console.log(fullNameRef.current, usernameRef.current, emailRef.current, passwordRef.current, confirmPasswordRef.current)
    }

    return (
        <CustomKeyboardView>
            <StatusBar style={"dark"} />
            <View style={{paddingTop: hp(7), paddingHorizontal: wp(5)}} className={"flex-1 gap-12"}>
                <View className={"items-center"}>
                    <Image style={{height: hp(20)}} resizeMode={"contain"} source={require("../assets/images/app/register.png")}/>
                </View>

                <View className={"gap-10"}>
                    <Text style={{fontSize: hp(4)}} className={"font-bold tracking-wider text-center text-neutral-800"}>
                        Sign Up
                    </Text>
                    <View className={"gap-4"}>
                        <View style={{height: hp(7)}} className={"flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"}>
                            <AntDesign name={"idcard"} size={hp(2.5)} color={"gray"} />
                            <TextInput
                                onChangeText={value => fullNameRef.current = value}
                                style={{fontSize: hp(2)}}
                                className={"flex-1 font-semibold text-neutral-700"}
                                placeholder={"Full Name"}
                                placeholderTextColor={"gray"}
                            />
                        </View>
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
                        <View style={{height: hp(7)}} className={"flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"}>
                            <Octicons name={"mail"} size={hp(2.5)} color={"gray"} />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={{fontSize: hp(2)}}
                                className={"flex-1 font-semibold text-neutral-700"}
                                placeholder={"Email"}
                                placeholderTextColor={"gray"}
                            />
                        </View>
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
                        <View style={{height: hp(7)}} className={"flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"}>
                                <FontAwesome6 name={"lock"} size={hp(2.5)} color={"gray"} />
                                <TextInput
                                    onChangeText={value => confirmPasswordRef.current = value}
                                    style={{fontSize: hp(2)}}
                                    className={"flex-1 font-semibold text-neutral-700"}
                                    placeholder={"Confirm Password"}
                                    secureTextEntry
                                    placeholderTextColor={"gray"}
                                />
                        </View>

                        {/*  Submit Button  */}
                        <View>
                            {
                                loading ? (
                                    <View className={"flex-row justify-center"}>
                                        <Loading size={hp(6.5)} />
                                    </View>
                                ) : (
                                    <TouchableOpacity onPress={handleRegister} style={{height: hp(6.5)}} className={"bg-indigo-500 rounded-xl justify-center items-center"}>
                                        <Text style={{fontSize: hp(2.7)}} className={"text-white font-bold tracking-wider "}>
                                            Sign Up
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>

                        {/*sign up button*/}
                        <View className={"flex-row justify-center"}>
                            <Text style={{fontSize: hp(1.8)}} className={"font-semibold text-neutral-500"}>Already have an acconut? </Text>
                            <Pressable onPress={() => router.push("/sign-in")}>
                                <Text style={{fontSize: hp(1.8)}} className={"font-bold text-indigo-500"}>Sign In</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    );
}