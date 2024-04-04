import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import { BsDot } from 'react-icons/bs'
import { CiCalendar } from 'react-icons/ci'
import { FaRegEdit } from 'react-icons/fa'
import { VscSymbolEvent } from 'react-icons/vsc'
import { modalClose, modalOpen, setModalType } from '../store/appReducer'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useLazyGetAllCategoriesQuery } from '../store/services/categoryApi'
import { useLazyGetAllHistoryQuery } from '../store/services/historyApi'
import {
    useCreateTaskMutation,
    useUpdateTaskMutation
} from '../store/services/taskApi'
import { TaskType } from '../store/types'
import formatDate from '../utils/formatDate'
import formatDueDate from '../utils/formatDueDate'
import AirDatepickerReact from './Datepicker/Datepicker-react'

type Props = {
    editMode?: boolean | undefined
    newTask?: boolean | undefined
}

const TaskDetails: FC<Props> = ({ editMode = false, newTask }) => {
    const dispatch = useAppDispatch()
    const {
        currentTaskId,
        allCategory,
        currentCategoryId,
        currentCategoryName,
        modalType
    } = useAppSelector((state) => state.app)

    const [createTask] = useCreateTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [triggerGetAllCategories] = useLazyGetAllCategoriesQuery()
    const [triggerGetAllHistory] = useLazyGetAllHistoryQuery()

    const [editData, setEditData] = useState<{
        title: string
        priority: 'Medium' | 'Low' | 'High'
        description: string
        status: string
    }>({
        title: '',
        priority: 'Medium',
        description: '',
        status: ''
    })

    const resetState = () => {
        dateRef.current = ''
        setEditData({
            title: '',
            priority: 'Medium',
            description: '',
            status: ''
        })
    }

    const taskCategory = allCategory.filter((category) => {
        const existThisTask = category.tasks.find(
            (task) => task.id === currentTaskId
        )
        return !!existThisTask
    })[0]

    const currentTask = allCategory.reduce<TaskType | null>((acc, category) => {
        const existThisTask = category.tasks.find(
            (task) => task.id === currentTaskId
        )
        return existThisTask || acc
    }, null)

    const dateRef = useRef(currentTask ? currentTask?.duedate : '')

    const editTaskMode = () => {
        dispatch(setModalType('TaskDetailsEdit'))
        dispatch(modalOpen())
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { title, priority, description } = editData

        if (newTask) {
            await createTask({
                title,
                priority,
                duedate: dateRef.current || '',
                description,
                category: currentCategoryId ?? 0,
                categoryName: currentCategoryName as string
            })
        } else {
            await updateTask({
                id: `${currentTask?.id}`,
                title,
                priority,
                duedate: dateRef.current || '',
                description,
                category: +taskCategory?.id
            })
        }
        dispatch(modalClose())
        dispatch(setModalType(''))
        resetState()
        await triggerGetAllCategories()
        await triggerGetAllHistory()
    }

    useEffect(() => {
        if (modalType === 'TaskDetailsEdit' && currentTask?.id) {
            setEditData({
                status: taskCategory.title,
                title: currentTask.title,
                priority: currentTask.priority,
                description: currentTask.description
            })
            dateRef.current = currentTask ? currentTask?.duedate : ''
        } else if (modalType === 'NewTask') {
            resetState()
        }
    }, [modalType, currentTask?.id])

    if (!allCategory) {
        return null
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="relative text-slate-900 before:absolute before:block before:h-10 before:w-full before:bg-slate-600 sm:flex"
        >
            <div
                className={`z-1 relative flex ${newTask ? 'w-full' : 'basis-3/5'}  flex-col gap-6 px-6 pb-6 pt-16 sm:pt-16`}
            >
                <div className="flex items-center justify-between text-xl">
                    {editMode ? (
                        <div className="flex w-full justify-between gap-x-3">
                            <input
                                value={editData.title}
                                onChange={(e) =>
                                    setEditData((prev) => ({
                                        ...prev,
                                        title: e.target.value
                                    }))
                                }
                                className="w-full bg-transparent text-base"
                                type="text"
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-white text-sm "
                            >
                                <FaRegEdit size={18} />
                                <span className="mt-[4px]">Save</span>
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="font-semibold">
                                {currentTask?.title}
                            </h2>
                            <button
                                type="button"
                                onClick={editTaskMode}
                                className="btn btn-white text-sm"
                            >
                                <FaRegEdit size={18} />
                                <span className="mt-[4px]">Edit task</span>
                            </button>
                        </>
                    )}
                </div>
                <div className="flex flex-col gap-y-4">
                    <div className="flex items-center  gap-4 text-sm ">
                        <div className="flex min-w-24 shrink-0 gap-x-2  text-slate-600">
                            <VscSymbolEvent size={18} />
                            <span>Status</span>
                        </div>
                        <span className="flex basis-1/2 text-base font-semibold">
                            {newTask
                                ? currentCategoryName
                                : taskCategory?.title}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm ">
                        <div className="flex min-w-24 shrink-0  gap-x-2  text-slate-600">
                            <CiCalendar size={18} />
                            <span className="">Due Data</span>
                        </div>

                        {editMode ? (
                            <AirDatepickerReact
                                range={false}
                                selectedDates={[dateRef.current]}
                                classes="bg-white"
                                autoClose={true}
                                onSelect={(date) => {
                                    dateRef.current = date.formattedDate
                                    console.log('Select', dateRef.current)
                                }}
                            />
                        ) : (
                            <span className="flex basis-1/2 font-semibold">
                                {formatDueDate(currentTask?.duedate) ||
                                    'Without execution date...'}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4 text-sm ">
                        <div className="flex min-w-24 shrink-0  gap-x-2  text-slate-600">
                            <VscSymbolEvent size={18} />
                            <span className="">Priority</span>
                        </div>

                        {editMode ? (
                            <input
                                value={editData.priority}
                                onChange={(e) =>
                                    setEditData((prev) => ({
                                        ...prev,
                                        priority: e.target.value as
                                            | 'Medium'
                                            | 'Low'
                                            | 'High'
                                    }))
                                }
                                className="w-full"
                                type="text"
                            />
                        ) : (
                            <span className="flex basis-1/2 font-semibold">
                                {currentTask?.priority}
                            </span>
                        )}
                    </div>
                </div>
                <div className="">
                    <h3 className="mb-2 text-base font-semibold">
                        Description
                    </h3>
                    {editMode ? (
                        <textarea
                            value={editData.description}
                            onChange={(e) =>
                                setEditData((prev) => ({
                                    ...prev,
                                    description: e.target.value
                                }))
                            }
                            className="min-h-36 w-full bg-transparent text-base"
                        />
                    ) : (
                        <p className="text-sm leading-6 md:max-w-[80%]">
                            {currentTask?.description}
                        </p>
                    )}
                </div>
            </div>
            {!newTask ? (
                <div className="w-full basis-2/5 bg-gray-200 px-6 py-6  font-normal sm:py-16">
                    <h3 className="relative mb-3 text-base font-semibold sm:mb-5">
                        Activity
                    </h3>
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 text-xs text-slate-600">
                        <div className="ml-[-6px] flex items-center">
                            <BsDot size={20} />
                            You created this task
                        </div>
                        <span>
                            {currentTask?.createdAt &&
                                formatDate(currentTask?.createdAt)}
                        </span>
                    </div>
                </div>
            ) : null}
        </form>
    )
}

export default TaskDetails
