import { apiSlice } from "./apiSlice";
const backendurl = import.meta.env ? import.meta.env.VITE_BE_URL : process.env.VITE_BE_URL
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (data) => ({
                url: `${backendurl}/users/auth`,
                method: "POST",
                body: data,
            }),

        }),
        register: build.mutation({
            query: (data) => ({
                url: `${backendurl}/users/`,
                method: "POST",
                body: data,
            })
        }),
        logout: build.mutation({
            query: () => ({
                url: `${backendurl}/users/logout`,
                method: "POST",
            }),
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice