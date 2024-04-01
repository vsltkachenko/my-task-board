import { FC } from 'react'
import Category from './Category'
import Task from './Task'
import { CategoryType } from '../store/types'

const List: FC<CategoryType> = ({ id, title, tasks }) => {
    //  console.log(id, title, createdAt, updatedAt, tasks)

    return (
        <div className="flex flex-col gap-4">
            <Category count={tasks.length || 0} title={title} id={id} />

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
                    />
                )
            )}
        </div>
    )
}

export default List
