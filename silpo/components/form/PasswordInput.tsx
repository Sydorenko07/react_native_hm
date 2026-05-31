import {Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {Control, Controller, FieldError, FieldValues} from "react-hook-form";
import { Eye, EyeOff } from 'lucide-react-native';
import {ILogin} from "@/types/auth/ILogin";

interface Props<T extends FieldValues> {
    control: Control<T> | undefined;
    isLoading: boolean;
    error: FieldError | undefined;
    label: string;
}

export const PasswordInput: React.FC<Props<ILogin>> = ({control, error, isLoading, label}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View className="gap-2">
            <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                {label}
            </Text>
            <Controller
                control={control}
                name="password"
                rules={{
                    required: 'Пароль є обов\'язковим',
                    minLength: {
                        value: 6,
                        message: 'Пароль має бути не менше 6 символів',
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <View className={`flex-row items-center border-2 rounded-xl px-4 ${
                            error
                                ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/20'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700'
                        }`}>
                            <TextInput
                                className="flex-1 py-3 text-base text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                                placeholder="••••••••"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                editable={!isLoading}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                                className="pl-2"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} className="text-slate-500 dark:text-slate-400" />
                                ) : (
                                    <Eye size={20} className="text-slate-500 dark:text-slate-400" />
                                )}
                            </TouchableOpacity>
                        </View>
                        {error && (
                            <Text className="text-sm text-red-500 dark:text-red-400 ml-1">
                                {error.message}
                            </Text>
                        )}
                    </>
                )}
            />
        </View>
    )
}

