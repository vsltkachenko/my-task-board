import { FaRegCircleDot } from 'react-icons/fa6'
import { BsDot } from 'react-icons/bs'
import { FC } from 'react'
import { HistoryType } from '../../store/types'

import formatDate from '../../utils/formatDate.ts'

const AsideCard: FC<HistoryType> = ({
    id,
    actionId,
    oldCategoryName,
    newCategoryName,
    oldTaskName,
    newTaskName,
    taskId,
    createdAt
}) => {
    // console.log(
    //     id,
    //     actionId,
    //     oldCategoryName,
    //     newCategoryName,
    //     oldTaskName,
    //     newTaskName,
    //     taskId,
    //     createdAt
    // )

    return (
        <div className="px-5 text-slate-600">
            <div className="py-2">
                <BsDot size={24} className="inline" />

                {/* ========================================================== */}
                {actionId === 1 && (
                    <>
                        <span>You create new list </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="px-[2px] font-semibold">
                            {newCategoryName}
                        </span>
                        <div className="mt-1 italic">
                            {formatDate(createdAt)}
                        </div>
                    </>
                )}
                {/* ========================================================== */}

                {actionId === 2 && (
                    <>
                        <span>You added new task</span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="px-[3px] font-semibold">
                            {newTaskName}
                        </span>
                        <span>to the </span>
                        <span className="font-semibold leading-6">
                            {oldCategoryName}
                        </span>
                        <div className="mt-1 italic">
                            {formatDate(createdAt)}
                        </div>
                    </>
                )}

                {/* ========================================================== */}

                {actionId === 3 && (
                    <>
                        <span>You moved </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="px-[2px] font-semibold">
                            {oldTaskName}
                        </span>
                        <span> from </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="font-semibold leading-6">
                            {oldCategoryName}
                        </span>
                        <span> to the </span>
                        <span className="font-semibold leading-6">
                            {newCategoryName}
                        </span>

                        <div className="mt-1 italic">
                            {formatDate(createdAt)}
                        </div>
                    </>
                )}

                {/* ========================================================== */}

                {actionId === 4 && (
                    <>
                        <span>You deleted </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="font-semibold leading-6">
                            {oldCategoryName}
                        </span>
                        <div className="mt-1 italic">
                            {formatDate(createdAt)}
                        </div>
                    </>
                )}

                {/* ========================================================== */}

                {actionId === 5 && (
                    <>
                        <span>You renamed </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="px-[1px] font-semibold">
                            {oldCategoryName}
                        </span>
                        <span> to </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="font-semibold leading-6">
                            {newCategoryName}
                        </span>

                        <div className="mt-1 italic">
                            {' '}
                            {formatDate(createdAt)}
                        </div>
                    </>
                )}

                {/* ========================================================== */}

                {actionId === 6 && (
                    <>
                        <span>You deleted </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block pb-[4px] pl-[3px]"
                        />
                        <span className="px-[3px] font-semibold">
                            {oldTaskName}
                        </span>
                        <span>from </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="font-semibold leading-6">
                            {' in the development...' + ')'}
                        </span>
                        <div className="mt-1 italic">
                            {formatDate(createdAt)}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AsideCard
