import { HiOutlineDotsVertical } from 'react-icons/hi'
import { CiCalendar } from 'react-icons/ci'
import { BsDot } from 'react-icons/bs'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { modalOpen, setCurrentTaskId, setModalType } from '../store/appReducer'
import { FC, useState } from 'react'
import Select from './Select'
import {
    useDeleteTaskMutation,
    useMoveTaskMutation
} from '../store/services/taskApi'
import { useLazyGetAllCategoriesQuery } from '../store/services/categoryApi'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import CardSelect from './CardSelect'
import getSelectOptions from '../utils/getSelectOptions'
import { useLazyGetAllHistoryQuery } from '../store/services/historyApi'

const taskMenu = [
    { name: 'Edit', action: 'edit-mode', pict: <FaRegEdit size={18} /> },
    { name: 'Delete', action: 'delete', pict: <RiDeleteBin6Line size={19} /> }
]

type Props = {
    id: number
    title: string
    duedate: string
    priority: 'Medium' | 'Low' | 'High'
    description: string
    createdAt: Date
    updatedAt: Date
}

const Task: FC<Props> = ({
    id,
    title,
    description,
    duedate,
    priority
    //  createdAt,
    //  updatedAt
}) => {
    const dispatch = useAppDispatch()
    const [isOpen, setOpen] = useState(false)
    const { allCategory } = useAppSelector((store) => store.app)

    const [deleteTask] = useDeleteTaskMutation()
    const [moveTask] = useMoveTaskMutation()
    const [triggerGetAllCategories] = useLazyGetAllCategoriesQuery()
    const [triggerGetAllHistory] = useLazyGetAllHistoryQuery()

    const moveTaskAction = async (category: string) => {
        await moveTask({ id: `${id}`, category: +category })
        await triggerGetAllCategories()
        await triggerGetAllHistory()
    }
    

    const taskActions = async (action: string | number) => {
        switch (action) {
            case 'open':
                dispatch(setCurrentTaskId(id))
                dispatch(setModalType('TaskDetails'))
                dispatch(modalOpen())
                break

            case 'edit-mode':
                dispatch(setCurrentTaskId(id))
                dispatch(setModalType('TaskDetailsEdit'))
                setOpen(false)
                dispatch(modalOpen())                
                break
            
            case 'delete':
                console.log('delete task')
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
                <span>{duedate}</span>
            </div>
            <div className="p-0.75 flex items-center rounded-2xl border bg-slate-100 text-slate-600">
                <BsDot size={24} />
                <span className="ml-[-4px] pr-2.5">{priority}</span>
            </div>

            <CardSelect
                actions={moveTaskAction}
                selectOptions={getSelectOptions(allCategory, id)}
            />

            <Select
                isOpen={isOpen}
                menuItems={taskMenu}
                actions={taskActions}
                cls={
                    'absolute right-[-10px] top-11 z-10 overflow-hidden rounded-md border-[1px] border-solid border-slate-300  bg-white py-2 font-medium text-slate-600'
                }
            />
        </div>
    )
}

export default Task
