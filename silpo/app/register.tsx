import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Animated,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';

import { EmailInput } from "@/components/form/register/EmailInput";
import { PasswordInput } from "@/components/form/register/PasswordInput";
import { FirstNameInput } from "@/components/form/register/FirstNameInput";
import { LastNameInput } from "@/components/form/register/LastNameInput";

import { useRegisterMutation } from "@/services/AuthService";
import { IRegister } from "@/types/auth/IRegister";
import { getErrorMessage } from "@/utils/getErrorMessage";

const ScrollView = Animated.ScrollView;

export default function RegisterScreen() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<IRegister>({
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            image: null,
        },
        mode: 'onBlur',
    });

    const [register, { isLoading, error }] = useRegisterMutation();

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert('Потрібен доступ до галереї');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            const asset = result.assets[0];

            setSelectedImage(asset.uri);

            setValue('image', {
                uri: asset.uri,
                name: 'avatar.jpg',
                type: 'image/jpeg',
            } as any);
        }
    };

    const onSubmit = async (data: IRegister) => {
        try {
            console.log('Form data:', data);

            const result = await register(data).unwrap();
            console.log(result);

            router.replace("/");
        } catch (ex) {
            console.log('Error occurred', ex);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
            <ScrollView>
                <KeyboardAvoidingView className="flex-1 py-20">
                    <View className="flex-1 justify-center px-6 gap-6">

                        {/* Header */}
                        <View className="items-center gap-3 mb-4">
                            <View className="w-14 h-14 bg-slate-900 dark:bg-white rounded-2xl items-center justify-center">
                                <Text className="text-2xl font-bold text-white dark:text-slate-900">
                                    S
                                </Text>
                            </View>

                            <Text className="text-3xl font-bold text-slate-900 dark:text-white">
                                Реєстрація до Silpo
                            </Text>

                            <Text className="text-base text-slate-600 dark:text-slate-400">
                                Введіть свої дані для реєстрації
                            </Text>
                        </View>

                        {/* Avatar Picker */}
                        <View className="items-center">
                            <TouchableOpacity
                                onPress={pickImage}
                                disabled={isLoading}
                                activeOpacity={0.85}
                                className="relative"
                            >
                                {selectedImage ? (
                                    <Image
                                        source={{ uri: selectedImage }}
                                        className="w-28 h-28 rounded-full border-4 border-slate-200 dark:border-slate-700"
                                    />
                                ) : (
                                    <View className="w-28 h-28 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-dashed border-slate-300 dark:border-slate-600 items-center justify-center">
                                        <Text className="text-4xl">📷</Text>
                                    </View>
                                )}

                                <View className="absolute bottom-1 right-1 bg-slate-900 dark:bg-white w-9 h-9 rounded-full items-center justify-center">
                                    <Text className="text-white dark:text-slate-900 text-lg font-bold">
                                        +
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <Text className="text-slate-600 dark:text-slate-400 text-sm mt-3">
                                Оберіть фото профілю
                            </Text>
                        </View>

                        {/* Error */}
                        {error && (
                            <View className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-xl p-4">
                                <Text className="text-red-700 dark:text-red-200 text-sm font-medium">
                                    {getErrorMessage(error)}
                                </Text>
                            </View>
                        )}

                        {/* Form */}
                        <View className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 gap-4">

                            <FirstNameInput
                                label={"Ім'я"}
                                control={control}
                                isLoading={isLoading}
                                error={errors.firstName}
                            />

                            <LastNameInput
                                label={"Прізвище"}
                                control={control}
                                isLoading={isLoading}
                                error={errors.lastName}
                            />

                            <EmailInput
                                label={"Електронна пошта"}
                                control={control}
                                isLoading={isLoading}
                                error={errors.email}
                            />

                            <PasswordInput
                                label={"Пароль"}
                                control={control}
                                isLoading={isLoading}
                                error={errors.password}
                            />

                            <TouchableOpacity
                                onPress={handleSubmit(onSubmit)}
                                disabled={isLoading}
                                activeOpacity={0.85}
                                className={`py-3 rounded-xl items-center justify-center mt-2 ${
                                    isLoading
                                        ? 'bg-slate-400 dark:bg-slate-600'
                                        : 'bg-slate-900 dark:bg-white'
                                }`}
                            >
                                {isLoading ? (
                                    <ActivityIndicator
                                        color={Platform.OS === 'ios' ? '#0f172a' : '#ffffff'}
                                    />
                                ) : (
                                    <Text className="text-white dark:text-slate-900 font-semibold">
                                        Зареєструватись
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Login link */}
                        <View className="flex-row justify-center items-center gap-1">
                            <Text className="text-slate-600 dark:text-slate-400 text-sm">
                                Вже маєте аккаунт?
                            </Text>

                            <TouchableOpacity
                                onPress={() => router.replace("/")}
                                disabled={isLoading}
                            >
                                <Text className="text-slate-900 dark:text-white font-semibold text-sm">
                                    Увійти
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}