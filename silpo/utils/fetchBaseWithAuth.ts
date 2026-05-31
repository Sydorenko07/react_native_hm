import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchBaseWithAuth = (config: {baseUrl: string}) => {
    const rawBaseQuery = fetchBaseQuery(config);

    return async (args: any, api: any, extraOptions: any) => {
        const token = await AsyncStorage.getItem("accessToken");

        const modifiedArgs =
            typeof args === "string" ?
                {
                    url: args,
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    }
                } : {
                    ...args,
                    headers: {
                        ...(args.headers || {}),
                        Authorization: token ? `Bearer ${token}` : ""
                    }
                };

        return rawBaseQuery(modifiedArgs, api, extraOptions);
    }
}