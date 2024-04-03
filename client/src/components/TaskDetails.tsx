import { VscSymbolEvent } from 'react-icons/vsc'
import { FaRegEdit } from 'react-icons/fa'
import { CiCalendar } from 'react-icons/ci'
import { BsDot } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../store/hooks'
// import { TaskType } from '../store/types'
import { FC, useEffect, useState } from 'react'
import {
    useCreateTaskMutation,
    useUpdateTaskMutation
} from '../store/services/taskApi'
import { TaskType } from '../store/types'
import { useLazyGetAllCategoriesQuery } from '../store/services/categoryApi'
import { modalClose, modalOpen, setModalType } from '../store/appReducer'
import { useLazyGetAllHistoryQuery } from '../store/services/historyApi'
import formatDate from '../utils/formatDate'

type Props = {
    editMode?: boolean | undefined
    newTask?: boolean | undefined
}

const TaskDetails: FC<Props> = ({ editMode = false, newTask }) => {
    const {
        currentTaskId,
        allCategory,
        currentCategoryId,
        currentCategoryName,
        modalType
    } = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch()

    const [createTask] = useCreateTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [triggerGetAllCategories] = useLazyGetAllCategoriesQuery()
    const [triggerGetAllHistory] = useLazyGetAllHistoryQuery()

    const [editData, setEditData] = useState<{
        title: string
        priority: 'Medium' | 'Low' | 'High'
        duedate: string
        description: string
        status: string
    }>({
        title: '',
        priority: 'Medium',
        duedate: '',
        description: '',
        status: ''
    })

    const resetState = () => {
        setEditData({
            title: '',
            priority: 'Medium',
            duedate: '',
            description: '',
            status: ''
        })
    }

    const thisTaskCategory = allCategory.filter((category) => {
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

    const editTaskMode = () => {
          dispatch(setModalType('TaskDetailsEdit'));              
        dispatch(modalOpen())  
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { title, priority, duedate, description } = editData

        if (newTask) {           
            await createTask({
                title,
                priority,
                duedate,
                description,
                category: currentCategoryId ?? 0,
                categoryName: currentCategoryName as string
            })
           
        } else {
                   
            await updateTask({
                id: `${currentTask?.id}`,
                title,
                priority,
                duedate,
                description,
                category: +thisTaskCategory?.id
            })
          
        }
        dispatch(modalClose())
        resetState()
        await triggerGetAllCategories()
        await triggerGetAllHistory()
    }

    useEffect(() => {      
        if (modalType === 'TaskDetailsEdit' && currentTask?.id) {
            setEditData({
                status: thisTaskCategory.title,
                title: currentTask.title,
                priority: currentTask.priority,
                duedate: currentTask.duedate,
                description: currentTask.description
            })
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
                            <button type='button' onClick={editTaskMode} className="btn btn-white text-sm">
                                <FaRegEdit size={18} />
                                <span className="mt-[4px]">Edit task</span>
                            </button>
                        </>
                    )}
                </div>
                <div className="flex flex-col gap-y-4">
                    <div className="flex items-center  gap-4 text-sm ">
                        <div className="flex shrink-0 gap-x-2 text-slate-600  sm:min-w-28">
                            <VscSymbolEvent size={18} />
                            <span>Status</span>
                        </div>
                        <span className="flex basis-1/2 text-base font-semibold">
                            {newTask
                                ? currentCategoryName
                                : thisTaskCategory?.title}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm ">
                        <div className="flex shrink-0 gap-x-2  text-slate-600  sm:min-w-28">
                            <CiCalendar size={18} />
                            <span className="">Due Data</span>
                        </div>

                        {editMode ? (
                            <input
                                // ref={myRef}
                                value={editData.duedate}
                                onChange={(e) =>
                                    setEditData((prev) => ({
                                        ...prev,
                                        duedate: e.target.value
                                    }))
                                }
                                className="w-full bg-transparent text-base"
                                type="text"
                            />
                        ) : (
                            <span className="flex basis-1/2 font-semibold">
                                {currentTask?.duedate}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4 text-sm ">
                        <div className="flex shrink-0 gap-x-2  text-slate-600  sm:min-w-28">
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
                                className="w-full bg-transparent text-base"
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
                            // ref={myRef}
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
