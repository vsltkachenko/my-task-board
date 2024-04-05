import { FC, useState } from 'react'
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc'
import { SelectOptionsType } from '../store/types'
import Select from './Select'

type Props = {
    actions: (option: string) => void
    selectOptions: SelectOptionsType[]
    cls?: string
    selected?: 'Medium' | 'Low' | 'High'
    variant?: 'select' | 'pop-up'
}

const CardSelect: FC<Props> = ({
    selectOptions,
    actions,
    selected,
    cls,
    variant
}) => {
    const [isOpen, setOpen] = useState(false)

    const cardActions = (action: string) => {
        setOpen(false)
        actions(action)
    }

    return (
        <div className={`${cls} relative w-full`}>
            <button
                type="button"
                onClick={() => setOpen(!isOpen)}
                className="btn btn-slate relative z-[2] w-full p-2 text-xs font-semibold"
            >
                {variant === 'select' ? selected : 'Move to:'}
                {isOpen ? (
                    <VscChevronUp size={20} />
                ) : (
                    <VscChevronDown size={20} />
                )}
            </button>
            <Select
                isOpen={isOpen}
                cls={` z-[1] mt-[-6px] pt-4 overflow-hidden rounded-md border-[1px] border-solid border-slate-400  bg-white py-2 font-medium text-slate-600 border-b-1 border-t-0 z-[1] + ${variant === 'select' ? 'absolute w-full ' : ''}`}
                menuItems={selectOptions}
                actions={cardActions}
            />
        </div>
    )
}

export default CardSelect
