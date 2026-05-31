import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getErrorMessage = (error: unknown): string => {
    if((error as FetchBaseQueryError)?.data) {
        const err = error as FetchBaseQueryError;
        return (err.data as string) || "Сталась помилка";
    }

    return "Невідома помилка"
}