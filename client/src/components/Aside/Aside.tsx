import { FC, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { setHistory } from '../../store/appReducer'
import { useAppDispatch } from '../../store/hooks'
import { useGetAllHistoryQuery } from '../../store/services/historyApi'
import BackDrop from '../BackDrop/BackDrop'
import './Aside.scss'
import AsideCard from './AsideCard'

type Props = {
    active: boolean
    asideClose: () => void
}

const Aside: FC<Props> = ({ active, asideClose }) => {
    const dispatch = useAppDispatch()

    const { data } = useGetAllHistoryQuery()

    useEffect(() => {
        if (data) {
            dispatch(setHistory(data))
        }
    }, [data, dispatch])

    if (!data) {
        return null
    }

    return (
        <>
            <BackDrop active={active} close={asideClose} />
            <aside className={`aside bg-slate-100 ${active ? 'open' : ''}`}>
                <div className="mb-3 w-full bg-slate-600">
                    <h2 className=" p-4 pl-6 text-xl text-white">History</h2>
                </div>

                <div className="h-full overflow-y-auto px-4">
                    {data.map((card, index: number) => (
                        <AsideCard key={index} {...card} />
                    ))}
                </div>

                <button
                    className={'btn-close right-5 top-5'}
                    onClick={asideClose}
                >
                    <AiOutlineClose size={18} />
                </button>
            </aside>
        </>
    )
}

export default Aside
