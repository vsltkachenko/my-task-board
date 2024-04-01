import { FC } from 'react'
import { SelectOptionsType } from '../store/types'

type Props = {
    isOpen: boolean
    actions: (value: string) => void
    menuItems: SelectOptionsType[]
    cls?: string
}

const Select: FC<Props> = ({ isOpen, menuItems, cls, actions }) => {
    return (
        <div className={`${cls} ${isOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col gap-y-1">
                {menuItems.map((el, index) => (
                    <li
                        onClick={() => actions(el.action)}
                        className="flex cursor-pointer bg-slate-100 items-center gap-x-2 px-3 py-1 hover:bg-slate-200 transition-all"
                        key={index}
                    >
                        {el.pict}
                        <span className="text-sm">{el.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Select
