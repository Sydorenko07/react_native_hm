import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "@/constants/Urls";
import {IUserView} from "@/types/auth/IUserView";
import {ILoginResponse} from "@/types/auth/ILoginResponse";
import {ILogin} from "@/types/auth/ILogin";
import { IRegisterResponse } from "@/types/auth/IRegisterResponse";
import {IRegister} from "@/types/auth/IRegister";
import {serialize} from "object-to-formdata";

export const AuthService = createApi({
   reducerPath: "authService",
   tagTypes: ["Auth", "Account"],
   baseQuery: fetchBaseQuery({baseUrl: BASE_URL+"/api/Auth"}),
    endpoints: (builder) => ({
        getUsers: builder.query<IUserView[], void>({
            query:() => 'GetUsers',
            providesTags: ["Auth"]
        }),
        login: builder.mutation<ILoginResponse, ILogin>({
            query:(data) => ({
                url: 'login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Auth", "Account"]
        }),
        register: builder.mutation<IRegisterResponse, IRegister>({
            query:(data) => ({
                url: 'register',
                method: 'POST',
                body: serialize(data)
            }),
            invalidatesTags: ["Auth"]
        })
    })
});

export const {
    useGetUsersQuery,
    useRegisterMutation,
    useLoginMutation,
} = AuthService;