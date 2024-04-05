import React from 'react'

export type TaskType = {
    id: number
    title: string
    duedate: string
    priority: 'Medium' | 'Low' | 'High'
    description: string
    createdAt: Date
    updatedAt: Date
    category: CategoryType
}

export type CategoryType = {
    id: number
    title: string
    createdAt: Date
    updatedAt: Date
    tasks: TaskType[]
}

export type HistoryType = {
    id: number
    actionId: number
    oldCategoryName: string
    newCategoryName: string
    oldTaskName: string
    newTaskName: string
    taskId: number
    createdAt: Date
}

export type SelectOptionsType = {
    name: string
    option: string
    pict?: React.ReactNode
}
