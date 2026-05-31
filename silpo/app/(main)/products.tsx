import React from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
} from 'react-native';

import {BASE_URL} from "@/constants/Urls";

import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';

import {
    useGetProductsByCategoryQuery,
    useGetProductsQuery,
} from '@/services/ProductService';

import { IProduct } from '@/types/product/IProduct';
import {UserHeader} from "@/components/ui/UserHeader";

export default function ProductsScreen() {

    const { categoryId } = useLocalSearchParams();

    const isCategory = !!categoryId;

    const {
        data: allProducts = [],
        isLoading: allLoading,
    } = useGetProductsQuery(undefined, {
        skip: isCategory,
    });

    const {
        data: categoryProducts = [],
        isLoading: categoryLoading,
    } = useGetProductsByCategoryQuery(Number(categoryId), {
        skip: !isCategory,
    });

    const products = isCategory ? categoryProducts : allProducts;

    const isLoading = isCategory ? categoryLoading : allLoading;

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-white dark:bg-slate-950 items-center justify-center">
                <ActivityIndicator size="large" color="#0f172a" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
            <View className="flex-1 px-4 pt-4">

                {/* Header */}
                <View className={"flex flex-row justify-between"}>
                    <View className="flex-row items-center mb-5">

                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => router.back()}
                            className="w-11 h-11 rounded-xl bg-slate-900 dark:bg-white items-center justify-center mr-4"
                        >
                            <Text className="text-white dark:text-slate-900 text-lg font-bold">
                                {"<"}
                            </Text>
                        </TouchableOpacity>

                        <View>
                            <Text className="text-3xl font-bold text-slate-900 dark:text-white">
                                Товари
                            </Text>

                            <Text className="text-slate-600 dark:text-slate-400 mt-1">
                                {products.length} товарів
                            </Text>
                        </View>
                    </View>

                    <UserHeader />
                </View>

                {/* Products */}
                <FlatList<IProduct>
                    data={products}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 mb-4 w-[48%] shadow-sm">

                            <Image
                                source={{ uri: `${BASE_URL}/images/400_${item.image}` }}
                                resizeMode="cover"
                                className="w-full h-32 rounded-xl mb-3"
                            />

                            <Text
                                numberOfLines={2}
                                className="text-slate-900 dark:text-white font-semibold text-base"
                            >
                                {item.name}
                            </Text>

                            <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                {item.categoryName}
                            </Text>

                            <Text className="text-xl font-bold text-slate-900 dark:text-white mt-3">
                                {item.price} ₴
                            </Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}