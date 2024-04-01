import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../constants'

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 })

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})
