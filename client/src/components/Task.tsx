import { BsDot } from 'react-icons/bs'
import { CiCalendar } from 'react-icons/ci'
import { HiOutlineDotsVertical } from 'react-icons/hi'

import { FC, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import {
    modalOpen,
    setCurrentCategoryId,
    setCurrentCategoryName,
    setCurrentTaskId,
    setModalType
} from '../store/appReducer'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useLazyGetAllCategoriesQuery } from '../store/services/categoryApi'
import { useLazyGetAllHistoryQuery } from '../store/services/historyApi'
import {
    useDeleteTaskMutation,
    useUpdateTaskMutation
} from '../store/services/taskApi'
import formatDueDate from '../utils/formatDueDate'
import getSelectOptions from '../utils/getSelectOptions'
import CardSelect from './CardSelect'
import Select from './Select'

const taskMenu = [
    { name: 'Edit', option: 'edit-mode', pict: <FaRegEdit size={18} /> },
    { name: 'Delete', option: 'delete', pict: <RiDeleteBin6Line size={19} /> }
]

type Props = {
    id: number
    title: string
    duedate: string
    priority: 'Medium' | 'Low' | 'High'
    description: string
    createdAt: Date
    updatedAt: Date
    categoryName: string
    categoryId: number
}

const Task: FC<Props> = ({
    id,
    title,
    description,
    duedate,
    priority,
    categoryName,
    categoryId
    //  createdAt,
    //  updatedAt
}) => {
    const dispatch = useAppDispatch()
    const [isOpen, setOpen] = useState(false)
    const { allCategory } = useAppSelector((store) => store.app)

    const [deleteTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [triggerGetAllCategories] = useLazyGetAllCategoriesQuery()
    const [triggerGetAllHistory] = useLazyGetAllHistoryQuery()

    const moveTaskAction = async (category: string) => {
        await updateTask({
            id: `${id}`,
            category: +category,
            currentCategoryName: categoryName,
            title,
            duedate,
            priority,
            description
        })
        await triggerGetAllCategories()
        await triggerGetAllHistory()
    }

    const taskActions = async (action: string) => {
        switch (action) {
            case 'open':
                dispatch(setCurrentTaskId(id))
                dispatch(setCurrentCategoryName(categoryName))
                dispatch(setCurrentCategoryId(categoryId))
                dispatch(setModalType('TaskDetails'))
                dispatch(modalOpen())
                break

            case 'edit-mode':
                dispatch(setCurrentTaskId(id))
                dispatch(setCurrentCategoryName(categoryName))
                dispatch(setCurrentCategoryId(categoryId))
                dispatch(setModalType('TaskDetailsEdit'))
                setOpen(false)
                dispatch(modalOpen())
                break

            case 'delete':
                await deleteTask(`${id}`).unwrap()
                await triggerGetAllCategories()
                await triggerGetAllHistory()
                break

            default:
                console.log('Bad action')
                break
        }
    }

    return (
        <div className="relative flex flex-col items-start gap-y-3 rounded-xl border bg-white p-2.5 text-slate-900">
            <div className="flex w-full items-center justify-between gap-x-4">
                <h3
                    className="cursor-pointer overflow-x-auto font-semibold underline-offset-4 transition hover:underline"
                    onClick={() => taskActions('open')}
                >
                    {title}
                </h3>
                <button
                    className="mr-[-6px] p-2"
                    onClick={() => setOpen(!isOpen)}
                >
                    <HiOutlineDotsVertical size={22} />
                </button>
            </div>
            <p className="leading-6">{description}</p>
            <div className="flex items-end gap-x-2 font-semibold text-slate-600">
                <CiCalendar size={24} />
                <span>
                    {formatDueDate(duedate) || 'Without execution date...'}
                </span>
            </div>
            <div className="p-0.75 flex items-center rounded-2xl border bg-slate-100 text-slate-600">
                <BsDot size={24} />
                <span className="ml-[-4px] pr-2.5">{priority}</span>
            </div>
            <Select
                isOpen={isOpen}
                menuItems={taskMenu}
                actions={taskActions}
                cls={
                    'absolute right-[-10px] top-11 z-10 overflow-hidden rounded-md border-[1px] border-solid border-slate-300  bg-white py-2 font-medium text-slate-600'
                }
            />
            <CardSelect
                actions={moveTaskAction}
                selectOptions={getSelectOptions(allCategory, id)}
            />
        </div>
    )
}

export default Task
