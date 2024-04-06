import { FC } from 'react'
import { BsDot } from 'react-icons/bs'
import { useAppSelector } from '../store/hooks'
import { HistoryType, TaskType } from '../store/types'
import formatDate from '../utils/formatDate'
import AsideCard from './Aside/AsideCard'

type Props = {
    currentTask: TaskType | null
}

const TaskActivity: FC<Props> = ({ currentTask }) => {
    const { allHistory } = useAppSelector((state) => state.app)

    const getTaskHistory = (
        allHistory: HistoryType[],
        id: number | undefined
    ) => {
        return allHistory.filter(
            (item) => item.taskId === id && item.actionId > 5
        )
    }

    const taskHistory = getTaskHistory(allHistory, currentTask?.id)

    return (
        <div className="w-full basis-2/5 bg-gray-200 px-6 py-6  font-normal sm:py-16">
            <h3 className="relative mb-3 text-base font-semibold">
                Activity
            </h3>
            <div className="text-xs">
                <div className="py-2 flex flex-col gap-x-4  text-slate-600">
                    <div className="">
                        <BsDot size={20} className="inline"/>
                        You created this task
                    </div>
						  
                    <span className='mt-1 italic'>
                        {currentTask?.createdAt &&
                            formatDate(currentTask?.createdAt)}
                    </span>
                </div>
                {taskHistory.map((item) => (
                    <AsideCard {...item} />
                ))}
            </div>
        </div>
    )
}

export default TaskActivity
