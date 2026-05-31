import {configureStore} from "@reduxjs/toolkit";
import {AuthService} from "@/services/AuthService";
import {AccountService} from "@/services/AccountService";
import {CategoryService} from "@/services/CategoryService";
import {ProductService} from "@/services/ProductService";

export const store = configureStore({
    reducer: {
        [AuthService.reducerPath]: AuthService.reducer,
        [AccountService.reducerPath]: AccountService.reducer,
        [CategoryService.reducerPath]: CategoryService.reducer,
        [ProductService.reducerPath]: ProductService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(AuthService.middleware)
            .concat(AccountService.middleware)
            .concat(CategoryService.middleware)
            .concat(ProductService.middleware)
})