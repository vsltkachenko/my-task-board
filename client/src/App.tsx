import Header from './components/Header'
import List from './components/List'
import Main from './components/Main'
import Modal from './components/Modal/Modal'
import { useAppDispatch } from './store/hooks'
import { useGetAllCategoriesQuery } from './store/services/categoryApi'
import { setAllCategory } from './store/appReducer'
import { useEffect } from 'react'

function App() {
    const dispatch = useAppDispatch()

    const { data } = useGetAllCategoriesQuery()

    useEffect(() => {
        if (data) {
            dispatch(setAllCategory(data))
        }
    }, [data, dispatch])

    if (!data) {
        return null
    }

    return (
        <div className="min-h-screen bg-slate-800 pb-4 font-roboto text-white">
            <Header />
            <Main>
                {data.map(({ id, title, createdAt, updatedAt, tasks }) => (
                    <List
                        id={id}
                        title={title}
                        createdAt={createdAt}
                        updatedAt={updatedAt}
                        tasks={tasks}
                        key={id}
                    />
                ))}
            </Main>
            <Modal />
        </div>
    )
}

export default App
