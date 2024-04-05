import { TaskType } from '../types'
import { api } from './api'

export const taskApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createTask: builder.mutation<
            TaskType,
            {
                title: string
                duedate: string
                priority: 'Medium' | 'Low' | 'High'
                description: string
                category: number
                currentCategoryName: string
            }
        >({
            query: (taskData) => ({
                url: '/tasks',
                method: 'POST',
                body: taskData
            })
        }),
        updateTask: builder.mutation<
            TaskType,
            {
                id: string
                title?: string
                duedate?: string
                priority?: 'Medium' | 'Low' | 'High'
                description?: string
                category: number
                currentCategoryName: string
            }
        >({
            query: ({
                id,
                title,
                duedate,
                priority,
                description,
                category,
                currentCategoryName
            }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: {
                    title,
                    duedate,
                    priority,
                    description,
                    category,
                    currentCategoryName
                }
            })
        }),  
        getAllTasks: builder.query<TaskType[], void>({
            query: () => ({
                url: '/tasks',
                method: 'GET'
            })
        }),
        getTaskById: builder.query<TaskType, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'GET'
            })
        }),
        deleteTask: builder.mutation<void, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useGetAllTasksQuery,
    useGetTaskByIdQuery,
    useDeleteTaskMutation,
    useLazyGetAllTasksQuery,
    useLazyGetTaskByIdQuery
} = taskApi

export const {
    endpoints: {
        createTask,
        updateTask,
        getAllTasks,
        getTaskById,
        deleteTask,
    }
} = taskApi
