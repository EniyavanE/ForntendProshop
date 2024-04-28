import { apiSlice } from "./apiSlice";
const backendurl = import.meta.env ? import.meta.env.VITE_BE_URL : process.env.VITE_BE_URL

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => ({
                url: `${backendurl}/products`
            })
        }),
        getProductDetail: build.query({
            query: (productId) => ({
                url: `${backendurl}/products/${productId}`
            })
        })

    }),

})

export const { useGetProductsQuery, useGetProductDetailQuery } = productApiSlice