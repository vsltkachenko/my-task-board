import { HistoryType } from '../types'
import { api } from './api'

export const historyApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllHistory: builder.query<HistoryType[], void>({
            query: () => ({
                url: '/history',
                method: 'GET'
            })
        }),

        deleteAllHistory: builder.mutation<void, void>({
            query: () => ({
                url: '/history',
                method: 'DELETE'
            })
        })
    })
})

export const {
    useGetAllHistoryQuery,
    useDeleteAllHistoryMutation,
    useLazyGetAllHistoryQuery
} = historyApi

export const {
    endpoints: { getAllHistory, deleteAllHistory }
} = historyApi
