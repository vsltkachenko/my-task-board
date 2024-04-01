import { FC, useState } from 'react'
import { VscChevronUp } from 'react-icons/vsc'
import { VscChevronDown } from 'react-icons/vsc'
import Select from './Select'
import { SelectOptionsType } from '../store/types'

type Props = {
    actions: (value: string) => void
    selectOptions: SelectOptionsType[]
    cls?: string
}

const CardSelect: FC<Props> = ({ actions, selectOptions }) => {
    const [isOpen, setOpen] = useState(false)

    return (
        <div className="relative w-full">
            <button
                onClick={() => setOpen(!isOpen)}
                className="z-1 btn btn-slate relative w-full p-2 text-xs font-semibold"
            >
                Move to:
                {isOpen ? (
                    <VscChevronUp size={20} />
                ) : (
                    <VscChevronDown size={20} />
                )}
            </button>
            <Select
                isOpen={isOpen}
                cls={
                    'mt-[-6px] z-2 pt-4 overflow-hidden rounded-md border-[1px] border-solid border-slate-400  bg-white py-2 font-medium text-slate-600 border-b-1 border-t-0'
                }
                menuItems={selectOptions}
                actions={actions}
            />
        </div>
    )
}

export default CardSelect
