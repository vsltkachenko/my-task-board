import { CategoryType, SelectOptionsType } from './../store/types'

const getSelectOptions = (
    allCategory: CategoryType[],
    id: number
): SelectOptionsType[] => {
    const filteredCategory = allCategory.filter((category) => {
        const existThisTask = category.tasks.find((task) => task.id === id)
        return !existThisTask
    })

    return filteredCategory.map((category) => ({
        option: `${category.id}`,
        name: category.title
    })) 
}
export default getSelectOptions
