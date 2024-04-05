import { FC } from 'react'
import { SelectOptionsType } from '../store/types'

type Props = {
    isOpen: boolean   
    actions: (option: string) => void
    menuItems: SelectOptionsType[]
    cls?: string
}

const Select: FC<Props> = ({ isOpen,  menuItems, cls, actions }) => {
    return (
        <div className={`${cls} ${isOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col gap-y-1">
                {menuItems.map((el, index) => (
                    <li
                        onClick={() => {                          
                            actions(el.option)
                        }}
                        className="flex cursor-pointer items-center gap-x-2 bg-slate-100 px-3 py-1 transition-all hover:bg-slate-200"
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
