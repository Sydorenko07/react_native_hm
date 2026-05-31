import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    ActivityIndicator, Image,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {AccountService, useGetProfileQuery} from "@/services/AccountService";
import { IProfile } from "@/types/account/IProfile";
import {AuthService} from "@/services/AuthService";
import {useDispatch} from "react-redux";
import {BASE_URL} from "@/constants/Urls";

export default function ProfileScreen() {

    const [user, setUser] = useState<IProfile | null>(null);

    const dispatch = useDispatch();

    const {
        data,
        isLoading,
        isError,
        error
    } = useGetProfileQuery();

    const logoutHandler = async () => {
        dispatch(AccountService.util.resetApiState());
        dispatch(AuthService.util.resetApiState());
        await AsyncStorage.removeItem('accessToken');
        router.replace("/");
    };

    useEffect(() => {
        if (isError) {
            console.log(error);
            logoutHandler();
        }

        if (!isLoading && data) {
            setUser(data);
        }
    }, [data, isLoading, isError]);

    if (isLoading && !data && !user) {
        return (
            <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#4F46E5" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">

            {/* Back Button */}
            {router.canGoBack() && (
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => router.back()}
                    className="absolute top-20 left-6 z-50 w-11 h-11 rounded-xl bg-slate-900 dark:bg-white items-center justify-center"
                >
                    <Text className="text-white dark:text-slate-900 text-lg font-bold">
                        {"<"}
                    </Text>
                </TouchableOpacity>
            )}

            <View className="flex-1 py-10 px-6 justify-between">

                {/* Profile */}
                <View className="items-center justify-center flex-1 gap-6">

                    {/* Avatar */}
                    <View className="w-24 h-24 bg-slate-900 dark:bg-white rounded-full items-center justify-center shadow-lg overflow-hidden">

                        {user?.image ? (
                            <Image
                                source={{
                                    uri: `${BASE_URL}/images/400_${data?.image}`,
                                }}
                                className="w-full h-full"
                            />
                        ) : (
                            <Text className="text-4xl font-bold text-white dark:text-slate-900">
                                {user?.firstName?.[0]}
                            </Text>
                        )}

                    </View>

                    {/* User Info */}
                    <View className="items-center">
                        <Text className="text-3xl font-bold text-slate-900 dark:text-white text-center">
                            {user?.firstName} {user?.lastName}
                        </Text>

                        <Text className="text-base text-slate-600 dark:text-slate-400 mt-2">
                            {user?.email}
                        </Text>
                    </View>
                </View>


                <View className="flex flex-col gap-3">
                    <TouchableOpacity
                        onPress={() => router.push("/chat")}
                        activeOpacity={0.85}
                        className={`py-4 px-4 rounded-2xl items-center justify-center ${
                            isLoading
                                ? 'bg-slate-400 dark:bg-slate-600'
                                : 'bg-slate-900 dark:bg-white'
                        }`}
                    >
                        <Text className="text-white dark:text-slate-900 font-semibold text-base">
                            Чат
                        </Text>
                    </TouchableOpacity>


                    {/* Logout */}
                    <TouchableOpacity
                        onPress={logoutHandler}
                        activeOpacity={0.85}
                        disabled={isLoading}
                        className={`py-4 px-4 rounded-2xl items-center justify-center ${
                            isLoading
                                ? 'bg-slate-400 dark:bg-slate-600'
                                : 'bg-slate-900 dark:bg-white'
                        }`}
                    >
                        {isLoading ? (
                            <ActivityIndicator
                                color={Platform.OS === 'ios' ? '#0f172a' : '#ffffff'}
                                size="small"
                            />
                        ) : (
                            <Text className="text-white dark:text-slate-900 font-semibold text-base">
                                Вийти
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}