import { CategoryType } from '../types'
import { api } from './api'

export const categoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation<CategoryType, { title: string }>({
            query: (categoryData) => ({
                url: '/categories',
                method: 'POST',
                body: categoryData
            })
        }),
        updateCategory: builder.mutation<
            CategoryType,
            { id: string; title: string }
        >({
            query: ({ id, title }) => ({
                url: `/categories/${id}`,
                method: 'PATCH',
                body: { title }
            })
        }),
        getAllCategories: builder.query<CategoryType[], void>({
            query: () => ({
                url: '/categories',
                method: 'GET'
            })
        }),
        getCategoryById: builder.query<CategoryType, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'GET'
            })
        }),
        deleteCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useGetAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useDeleteCategoryMutation,
    useLazyGetAllCategoriesQuery,
    useLazyGetCategoryByIdQuery
} = categoryApi

export const {
    endpoints: {
        createCategory,
        updateCategory,
        getAllCategories,
        getCategoryById,
        deleteCategory
    }
} = categoryApi
