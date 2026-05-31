import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseWithAuth} from "@/utils/fetchBaseWithAuth";
import {BASE_URL} from "@/constants/Urls";
import {ICategory} from "@/types/category/ICategory";

export const CategoryService = createApi({
    reducerPath: 'categoryService',
    tagTypes: ['Category'],
    baseQuery: fetchBaseWithAuth({baseUrl: BASE_URL + "/api/categories"}),
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => '/',
            providesTags: ['Category']
        })
    }),
})

export const {
    useGetCategoriesQuery,
} = CategoryService