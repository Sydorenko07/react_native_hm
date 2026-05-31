import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseWithAuth} from "@/utils/fetchBaseWithAuth";
import {BASE_URL} from "@/constants/Urls";
import {IProfile} from "@/types/account/IProfile";

export const AccountService = createApi({
    reducerPath: 'accountService',
    tagTypes: ['Account'],
    baseQuery: fetchBaseWithAuth({baseUrl: BASE_URL + "/api/account"}),
    endpoints: (builder) => ({
        getProfile: builder.query<IProfile, void>({
            query: () => '/',
            providesTags: ['Account']
        })
    }),
})

export const {
    useGetProfileQuery,
} = AccountService