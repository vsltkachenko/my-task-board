import { FC } from 'react'
import { BsDot } from 'react-icons/bs'
import { FaRegCircleDot } from 'react-icons/fa6'
import { HistoryType } from '../../store/types'

import formatDate from '../../utils/formatDate.ts'
import formatDueDate from '../../utils/formatDueDate.ts'

const AsideCard: FC<HistoryType> = ({
    actionId,
    oldCategoryName,
    newCategoryName,
    oldTaskName,
    newTaskName,
    oldPriority,
    newPriority,
    oldDuedate,
    newDuedate,
    oldDescription,
    newDescription,
    createdAt
}) => {
    return (
        <div className="px-5 text-slate-600">
            <div className="border-b py-2">
                <BsDot size={24} className="inline" />

                {/* ================= Create new list ====================== */}
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
                {/* =================== Add new task ======================= */}

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

                {/* ==================== Move task =========================== */}

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

                {/* =================== Delete list =========================== */}

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

                {/* ==================== Rename list =========================== */}

                {actionId === 5 && (
                    <>
                        <span>You renamed list </span>
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
                            {formatDate(createdAt)}
                        </div>
                    </>
                )}

                {/* ====================== Delete task ============================ */}

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
                            {oldCategoryName}
                        </span>
                        <div className="mt-1 italic">
                            {formatDate(createdAt)}
                        </div>
                    </>
                )}

                {/* ====================== Rename task ============================= */}

                {actionId === 7 && (
                    <>
                        <span>You renamed task </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="px-[1px] font-medium">
                            {oldTaskName}
                        </span>
                        <span> to </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="font-medium leading-6">
                            {newTaskName}
                        </span>
                        <span> in the </span>
                        <span className="font-semibold">{oldCategoryName}</span>
                        <span> list</span>
                        <div className="mt-1 italic">
                            {formatDate(createdAt)}
                        </div>
                    </>
                )}
                {/* ======================= Change status ============================ */}

                {actionId === 8 && (
                    <>
                        <span>You changed priority </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="px-[1px] font-semibold">
                            {oldTaskName}
                        </span>
                        <span> from </span>
                        <span className="font-medium leading-6">
                            {oldPriority}
                        </span>
                        <span> to </span>
                        <span className="font-medium leading-6">
                            {newPriority}
                        </span>

                        <div className="mt-1 italic">
                            {formatDate(createdAt)}
                        </div>
                    </>
                )}
                {/* ====================== Change due date ============================= */}

                {actionId === 9 && (
                    <>
                        <span>You changed due date </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="px-[1px] font-semibold">
                            {oldTaskName}
                        </span>
                        <span> from </span>
                        <span className="font-medium leading-6">
                            {formatDueDate(oldDuedate)}
                        </span>
                        <span> to </span>
                        <span className="font-medium leading-6">
                            {formatDueDate(newDuedate)}
                        </span>

                        <div className="mt-1 italic">
                            {formatDate(createdAt)}
                        </div>
                    </>
                )}
                {/* ================== Change description =========================== */}

                {actionId === 10 && (
                    <>
                        <span>You changed the description </span>
                        <FaRegCircleDot
                            size={16}
                            className="inline-block px-[2px] pb-[3px]"
                        />
                        <span className="px-[1px] font-semibold">
                            {oldTaskName}
                        </span>
                        <span> from </span>
                        <span className="font-medium leading-6">
                            {oldDescription}
                        </span>
                        <span> to </span>
                        <span className="font-medium leading-6">
                            {newDescription}
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
