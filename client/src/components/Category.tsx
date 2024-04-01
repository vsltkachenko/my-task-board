import { FC, useRef, useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import Select from './Select'
import {
    useDeleteCategoryMutation,
    useLazyGetAllCategoriesQuery,
    useUpdateCategoryMutation
} from '../store/services/categoryApi'
import { IoAdd } from 'react-icons/io5'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useAppDispatch } from '../store/hooks'
import {
    modalOpen,
    setCurrentCategoryId,
    setCurrentCategoryName,
    setModalType
} from '../store/appReducer'
import { useLazyGetAllHistoryQuery } from '../store/services/historyApi'

const categoryMenu = [
    { name: 'Edit', action: 'edit-mode', pict: <FaRegEdit size={18} /> },
    { name: 'Add new card', action: 'add-new-card', pict: <IoAdd size={22} /> },
    { name: 'Delete', action: 'delete', pict: <RiDeleteBin6Line size={19} /> }
]

type Props = {
    count: number
    title: string
    id: number
}

const Category: FC<Props> = ({ count, title, id }) => {
    const dispatch = useAppDispatch()

    const [isOpen, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const myRef = useRef<HTMLInputElement | null>(null)
    const [value, setValue] = useState(title)

    const [deleteCategory] = useDeleteCategoryMutation()
    const [triggerGetAllCategories] = useLazyGetAllCategoriesQuery()
    const [triggerGetAllHistory] = useLazyGetAllHistoryQuery()
    const [updateCategory] = useUpdateCategoryMutation()

    const categoryActions = async (action: string) => {
        switch (action) {
            case 'edit-mode':
                setOpen(false)
                setEditMode(true)
                break

            case 'edit-submit':
                console.log(value)
                setEditMode(false)
                await updateCategory({ id: `${id}`, title: value })
                await triggerGetAllCategories()
                await triggerGetAllHistory()
                break

            case 'add-new-card':
                dispatch(setCurrentCategoryId(id))
                dispatch(setCurrentCategoryName(title))
                dispatch(setModalType('NewTask'))
                setOpen(false)
                dispatch(modalOpen())
                break

            case 'delete':
                console.log('delete category')
                await deleteCategory(`${id}`).unwrap()
                await triggerGetAllCategories()
                await triggerGetAllHistory()
                break

            default:
                console.log('Bad action')
                break
        }
    }

    return (
        <>
            <div ref={myRef} className="relative">
                <div className="flex items-center justify-between gap-x-4 border-y-[1px] p-1">
                    <div className="w-full overflow-x-auto">
                        {editMode ? (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    categoryActions('edit-submit')
                                }}
                                className="flex w-auto justify-between gap-x-3"
                            >
                                <input
                                    ref={myRef}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    className="w-full bg-transparent text-base"
                                    type="text"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-white text-slate-900"
                                >
                                    Save
                                </button>
                            </form>
                        ) : (
                            <span>{title}</span>
                        )}
                    </div>
                    {!editMode ? (
                        <div className="flex items-center gap-3">
                            <span>{count}</span>
                            <button
                                className="p-2"
                                onClick={() => setOpen(!isOpen)}
                            >
                                <HiOutlineDotsVertical size={22} />
                            </button>
                        </div>
                    ) : null}
                </div>
                <Select
                    isOpen={isOpen}
                    menuItems={categoryMenu}
                    actions={categoryActions}
                    cls={
                        'absolute right-[-10px] top-11 z-10 overflow-hidden rounded-md border-[1px] border-solid border-slate-300 border-transparent bg-white py-2 font-medium text-slate-600'
                    }
                />
            </div>
            <button
                className="btn btn-slate justify-center p-2"
                onClick={() => categoryActions('add-new-card')}
            >
                <IoAdd size={22} />
                <span>Add new card</span>
            </button>
        </>
    )
}

export default Category
