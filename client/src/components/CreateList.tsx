import { FC, useState } from 'react'
import {
    useCreateCategoryMutation,
    useLazyGetAllCategoriesQuery
} from '../store/services/categoryApi'

const CreateList: FC = () => {
    const [createCategory] = useCreateCategoryMutation()
    const [triggerGetAllCategories] = useLazyGetAllCategoriesQuery()

    const [title, setTitle] = useState('')

    const handleSubmit = async (title: string) => {
        try {
            await createCategory({ title }).unwrap()
            setTitle('')
            await triggerGetAllCategories().unwrap()
        } catch (error) {
            console.log('err', error)
        }
    }

    return (
        <form className="p-8" onSubmit={() => handleSubmit(title)}>
            <label
                className="mb-3 block text-base font-medium text-slate-900"
                htmlFor="category"
            >
                Create new list
            </label>
            <input
                className="mb-8 w-full border-0 border-b-[1px] px-2 pb-0 text-slate-900"
                type="text"
                id="category"
                placeholder="List name"
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <button type="submit" className="btn btn-slate">
                <span>Create</span>
            </button>
        </form>
    )
}

export default CreateList
