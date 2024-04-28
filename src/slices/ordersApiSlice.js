import { apiSlice } from "./apiSlice";
const backendurl = import.meta.env ? import.meta.env.VITE_BE_URL : process.env.VITE_BE_URL

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createOrder: build.mutation({
            query: (order) => ({
                url: `${backendurl}/orders`,
                method: 'POST',
                body: order
            })
        }),
        getOrderDetails: build.query({
            query: (id) => ({
                url: `${backendurl}/orders/${id}`,
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = ordersApiSlice;