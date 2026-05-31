import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useGetCategoriesQuery } from '@/services/CategoryService';
import { ICategory } from '@/types/category/ICategory';
import {UserHeader} from "@/components/ui/UserHeader";

export default function CategoriesScreen() {

    const {
        data: categories = [],
        isLoading,
        error,
    } = useGetCategoriesQuery();

    const openCategory = (id?: number) => {
        if (id) {
            router.push(`/(main)/products?categoryId=${id}`);
        } else {
            router.push('/(main)/products');
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-white dark:bg-slate-950 items-center justify-center">
                <ActivityIndicator size="large" color="#0f172a" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">

            <View className="flex-1 px-6 pt-6">
                <View className={"flex flex-row justify-between"}>
                    <View className={"flex flex-col"}>
                        <Text className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Категорії
                        </Text>

                        <Text className="text-slate-600 dark:text-slate-400 mb-6">
                            Оберіть категорію товарів
                        </Text>
                    </View>

                    <UserHeader />
                </View>

                <FlatList<ICategory>
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => openCategory()}
                            className="bg-slate-900 dark:bg-white rounded-2xl p-5 mb-4"
                        >
                            <Text className="text-white dark:text-slate-900 text-lg font-bold">
                                Всі товари
                            </Text>
                        </TouchableOpacity>
                    )}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => openCategory(item.id)}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-4 shadow-sm"
                        >
                            <Text className="text-lg font-semibold text-slate-900 dark:text-white">
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}