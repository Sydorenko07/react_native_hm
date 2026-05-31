import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseWithAuth} from "@/utils/fetchBaseWithAuth";
import {BASE_URL} from "@/constants/Urls";
import {IProduct} from "@/types/product/IProduct";

export const ProductService = createApi({
    reducerPath: 'productService',
    tagTypes: ['Product'],
    baseQuery: fetchBaseWithAuth({baseUrl: BASE_URL + "/api/products"}),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => '/',
            providesTags: ['Product']
        }),
        getProductsByCategory: builder.query<IProduct[], number>({
            query: (id) => ({
                url: "/",
                params: { categoryId: id }
            }),
            providesTags: ['Product'],
        })
    }),
})

export const {
    useGetProductsQuery,
    useGetProductsByCategoryQuery
} = ProductService