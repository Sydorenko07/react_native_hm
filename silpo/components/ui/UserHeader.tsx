import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image, ActivityIndicator,
} from 'react-native';
import {useGetProfileQuery} from "@/services/AccountService";
import {router} from "expo-router";
import {BASE_URL} from "@/constants/Urls";

type Props = {
    name?: string;
    email?: string;
};

export const UserHeader = () => {
    const {data, isLoading} = useGetProfileQuery();

    if (isLoading && !data) {
        return (
            <>
                <View className="flex-row items-center justify-between mb-6">
                    {/* User */}
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="flex-row items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2"
                    >
                        <ActivityIndicator size="small" color="#0f172a" />
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    return (
        <View
            className="flex-row items-center justify-between mb-6">

            {/* User */}
            <TouchableOpacity
                activeOpacity={0.85}
                className="flex-row items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2"
                onPress={() => router.push("/profile")}
            >
                <View className="mr-3 items-end">
                    <Text className="text-slate-900 dark:text-white font-semibold">
                        {data?.firstName}
                    </Text>
                </View>

                {data?.image ? (
                    <Image
                        source={{
                            uri: `${BASE_URL}/images/100_${data?.image}`,
                        }}
                        className="w-11 h-11 rounded-xl"
                    />
                ) : (
                    <View className="w-11 h-11 rounded-xl bg-slate-900 dark:bg-white flex justify-center items-center">
                        <Text className={"font-medium text-white dark:text-slate-900"}>{data?.firstName[0]}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};