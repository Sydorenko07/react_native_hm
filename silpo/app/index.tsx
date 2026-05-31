import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';

import {EmailInput} from "@/components/form/EmailInput";
import {ILogin} from "@/types/auth/ILogin";
import {PasswordInput} from "@/components/form/PasswordInput";
import {useLoginMutation} from "@/services/AuthService";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm<ILogin>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const [login, {isLoading, error}] = useLoginMutation();


    useEffect(() => {
        async function checkLogin() {
            if (await AsyncStorage.getItem('accessToken'))
            {
                router.replace("/(main)/categories")
            }
        }
        checkLogin();
    }, [])

    const onSubmit = async (data: ILogin) => {
        try {
            console.log('Form data:', data);
            const result = await login(data).unwrap();

            await AsyncStorage.setItem('accessToken', result.token);

            Alert.alert("Вхід успішний", "Ми Вас вітаємо. Успішно.")

            router.replace("/(main)/categories")
        }
        catch(ex) {
            console.log('Error occured', ex);
        }
        finally {
            // setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 justify-center px-6 gap-6">
                    {/* Header */}
                    <View className="items-center gap-3 mb-4">
                        {/* Logo */}
                        <View className="w-14 h-14 bg-slate-900 dark:bg-white rounded-2xl items-center justify-center shadow-lg">
                            <Text className="text-2xl font-bold text-white dark:text-slate-900">
                                S
                            </Text>
                        </View>
                        <Text className="text-3xl font-bold text-slate-900 dark:text-white">
                            Вхід до Silpo
                        </Text>
                        <Text className="text-base text-slate-600 dark:text-slate-400">
                            Введіть свої дані для входу
                        </Text>
                    </View>

                    {error && (
                        <View className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-xl p-4">
                            <Text className="text-red-700 dark:text-red-200 text-sm font-medium">
                                Не вірно вказано дані
                            </Text>
                        </View>
                    )}

                    <View className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 gap-4 shadow-sm">
                        {/* Email Field */}

                        <EmailInput
                            label={"Електронна пошта"}
                            control={control}
                            isLoading={isLoading}
                            error={errors.email} />

                        {/* Password Field */}
                        <PasswordInput
                            label={"Пароль"}
                            control={control}
                            isLoading={isLoading}
                            error={errors.password} />

                        {/* Forgot Password */}
                        <TouchableOpacity
                            disabled={isLoading}
                            className="self-end mt-1"
                        >
                            <Text className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                Забули пароль?
                            </Text>
                        </TouchableOpacity>

                        {/* Submit Button */}
                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            disabled={isLoading}
                            activeOpacity={0.85}
                            className={`py-3 px-4 rounded-xl items-center justify-center mt-2 ${
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
                                    Увійти
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Register Link */}
                    <View className="flex-row justify-center items-center gap-1">
                        <Text className="text-slate-600 dark:text-slate-400 text-sm">
                            Немає акаунту?
                        </Text>
                        <TouchableOpacity disabled={isLoading} onPress={() => router.replace("/register")}>
                            <Text className="text-slate-900 dark:text-white font-semibold text-sm">
                                Зареєструватись
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}