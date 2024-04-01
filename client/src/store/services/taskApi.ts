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
                categoryName: string
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
                title: string
                duedate: string
                priority: 'Medium' | 'Low' | 'High'
                description: string
                category: number               
            }
        >({
            query: ({
                id,
                title,
                duedate,
                priority,
                description,
                category
            }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: { title, duedate, priority, description, category }
            })
        }),
        moveTask: builder.mutation<TaskType, { id: string; category: number }>({
            query: ({ id, category }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: { category }
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
    useMoveTaskMutation,
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
        moveTask
    }
} = taskApi
