import { FC, useState } from 'react'
import { VscHistory } from 'react-icons/vsc'
import { IoAdd } from 'react-icons/io5'
import { useAppDispatch } from '../store/hooks'
import { modalOpen, setModalType } from '../store/appReducer'
import Aside from './Aside/Aside'

const Header: FC = () => {
    const dispatch = useAppDispatch()

    const [isAsideOpen, setAsideOpen] = useState(false)
    const asideClose = () => setAsideOpen(false)

    const createNewList = () => {
        dispatch(setModalType('CreateNewList'))
        dispatch(modalOpen())
    }

    return (
        <header className="bg-slate-700 py-4">
            <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
                <h1 className="text-2xl">My Task Board</h1>
                <div className="flex flex-wrap gap-4">
                    <button
                        className="btn btn-yellow"
                        onClick={() => setAsideOpen(true)}
                    >
                        <VscHistory size={18} />
                        <span>History</span>
                    </button>
                    <button className="btn btn-green" onClick={createNewList}>
                        <IoAdd size={22} />
                        <span>Create new list</span>
                    </button>
                </div>
            </div>
            <Aside active={isAsideOpen} asideClose={asideClose} />
        </header>
    )
}

export default Header
