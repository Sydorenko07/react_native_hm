import {Text, TextInput, View} from "react-native";
import React from "react";
import {Control, Controller, FieldError, FieldValues} from "react-hook-form";
import {IRegister} from "@/types/auth/IRegister";

interface Props<T extends FieldValues> {
    control: Control<T> | undefined;
    isLoading: boolean;
    error: FieldError | undefined;
    label: string;
}

export const LastNameInput: React.FC<Props<IRegister>> = ({control, error, isLoading, label}) => {
    return (
        <View className="gap-2">
            <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                {label}
            </Text>
            <Controller
                control={control}
                name="lastName"
                rules={{
                    required: "Прізвище є обов'язковим",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            className={`px-4 py-3 text-base rounded-xl border-2 ${
                                error
                                    ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-white'
                            } placeholder:text-slate-500 dark:placeholder:text-slate-400`}
                            placeholder="Новак"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            keyboardType="default"
                            autoCapitalize="words"
                            autoCorrect={true}
                            editable={!isLoading}
                        />
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

