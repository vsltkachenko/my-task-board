import { FC } from 'react'
import { CategoryType } from '../store/types'
import Category from './Category'
import Task from './Task'

const List: FC<CategoryType> = ({ id:categoryId, title: categoryName, tasks }) => {
    //  console.log(id, title, createdAt, updatedAt, tasks)

    return (
        <div className="flex flex-col gap-4">
            <Category count={tasks.length || 0} title={categoryName} id={categoryId} />

            {tasks.map(
                ({
                    id,
                    title,
                    duedate,
                    priority,
                    description,
                    createdAt,
                    updatedAt
                }) => (
                    <Task
                        id={id}
                        title={title}
                        duedate={duedate}
                        priority={priority}
                        description={description}
                        createdAt={createdAt}
                        updatedAt={updatedAt}
                        key={id}
                        categoryName={categoryName}
                        categoryId={categoryId}
                    />
                )
            )}
        </div>
    )
}

export default List
