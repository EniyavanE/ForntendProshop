import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const backendurl = import.meta.env ? import.meta.env.VITE_BE_URL : process.env.VITE_BE_URL

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: backendurl }),
    endpoints: (builder) => ({})
});