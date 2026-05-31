import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import * as SignalR from '@microsoft/signalr';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useDispatch } from "react-redux";

import { Image } from 'react-native';

import { AccountService } from "@/services/AccountService";
import { AuthService } from "@/services/AuthService";
import { useGetProfileQuery } from "@/services/AccountService";
import { IProfile } from "@/types/account/IProfile";
import { BASE_URL } from "@/constants/Urls";

interface Message {
    id: string;
    name: string;
    image: string;
    message: string;
    timestamp: Date;
}

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<IProfile | null>(null);

    const hubRef = useRef<SignalR.HubConnection | null>(null);
    const dispatch = useDispatch();

    const { data, isError, error } = useGetProfileQuery();

    const logoutHandler = async () => {
        dispatch(AccountService.util.resetApiState());
        dispatch(AuthService.util.resetApiState());
        await AsyncStorage.removeItem('accessToken');
        router.replace("/");
    };

    useEffect(() => {
        if (isError) logoutHandler();
        if (data) setUser(data);
    }, [data, isError]);

    useEffect(() => {
        const set = async () => {
            await initSignalR();
            return () => hubRef.current?.stop();
        }

        set();
    }, []);

    const initSignalR = async () => {
        try {
            const connection = new SignalR.HubConnectionBuilder()
                .withUrl(`${BASE_URL}/chat`)
                .withAutomaticReconnect()
                .build();

            connection.on('Send', (data: Message) => {
                const msg: Message = {
                    id: Date.now().toString(),
                    name: data.name,
                    image: data.image,
                    message: data.message,
                    timestamp: new Date(),
                };

                setMessages(prev => [msg, ...prev]);
            });

            connection.onreconnecting(() => setIsConnected(false));
            connection.onreconnected(() => setIsConnected(true));
            connection.onclose(() => setIsConnected(false));

            await connection.start();
            hubRef.current = connection;

            setIsConnected(true);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            setIsConnected(false);
        }
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() || !hubRef.current || !isConnected) return;

        await hubRef.current.invoke('Send', {
            message: inputMessage,
            name: `${user?.firstName} ${user?.lastName}`,
            image: user?.image,
        });

        setInputMessage('');
    };

    const renderItem = ({ item }: { item: Message }) => {
        const isMine = item.name === `${user?.firstName} ${user?.lastName}`;

        return (
            <View className={`flex-row mb-3 ${isMine ? 'justify-end' : 'justify-start'} items-end`}>

                {/* Avatar (ліва сторона) */}
                {!isMine && (
                    <View className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 mr-2 overflow-hidden items-center justify-center">
                        {item.image ? (
                            <Image
                                source={{ uri: `${BASE_URL}/images/50_${item.image}` }}
                                className="w-9 h-9 rounded-full"
                            />
                        ) : (
                            <Text className="text-slate-600 dark:text-white font-bold">
                                {item.name[0]}
                            </Text>
                        )}
                    </View>
                )}

                {/* Message bubble */}
                <View
                    className={`px-4 py-2 rounded-2xl max-w-[75%] border
                ${isMine
                        ? 'bg-slate-900 border-slate-900'
                        : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                    }`}
                >
                    <Text className={`text-xs mt-1 ${isMine ? 'text-slate-300' : 'text-slate-500'}`}>
                        {item.name}
                    </Text>

                    <Text className={`text-sm ${isMine ? "text-end" : "text-start"}  ${isMine ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {item.message}
                    </Text>

                    <Text className={`text-[10px] mt-1 ${isMine ? 'text-slate-400' : 'text-slate-400'}`}>
                        {item.timestamp.toLocaleTimeString('uk-UA')}
                    </Text>
                </View>

                {/* Avatar (права сторона — можна показати твою) */}
                {isMine && (
                    <View className="w-9 h-9 rounded-full bg-slate-900 ml-2 overflow-hidden items-center justify-center">
                        {user?.image ? (
                            <Image
                                source={{ uri: `${BASE_URL}/images/50_${item.image}` }}
                                className="w-9 h-9 rounded-full"
                            />
                        ) : (
                            <Text className="text-white font-bold">
                                {user?.firstName?.charAt(0)}
                            </Text>
                        )}
                    </View>
                )}

            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 bg-slate-50 dark:bg-slate-950"
        >

            {/* HEADER */}
            <View className="px-5 pt-14 pb-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <View className="flex-row items-center justify-between">

                    {/* BACK BUTTON */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-white items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <Text className="text-white dark:text-slate-900 text-lg font-bold">
                            {"<"}
                        </Text>
                    </TouchableOpacity>

                    {/* TITLE */}
                    <Text className="text-xl font-bold text-slate-900 dark:text-white">
                        Чат
                    </Text>

                    {/* STATUS */}
                    <View className="flex-row items-center">
                        <View className={`w-2.5 h-2.5 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                        <Text className="text-slate-600 dark:text-slate-400 text-sm">
                            {isConnected ? 'online' : 'offline'}
                        </Text>
                    </View>

                </View>
            </View>

            {/* BODY */}
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" />
                    <Text className="mt-3 text-slate-500">
                        Підключення...
                    </Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={messages}
                        inverted
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ padding: 16 }}
                    />

                    {/* INPUT */}
                    <View className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-row items-end gap-2">

                        <TextInput
                            value={inputMessage}
                            onChangeText={setInputMessage}
                            placeholder="Написати повідомлення..."
                            placeholderTextColor="#94a3b8"
                            multiline
                            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-2xl max-h-28"
                        />

                        <TouchableOpacity
                            onPress={sendMessage}
                            disabled={!isConnected || !inputMessage.trim()}
                            className={`px-5 py-3 rounded-2xl items-center justify-center
                                ${isConnected && inputMessage.trim()
                                ? 'bg-slate-900'
                                : 'bg-slate-400'
                            }`}
                        >
                            <Text className="text-white font-semibold">
                                Send
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </KeyboardAvoidingView>
    );
};

export default Chat;