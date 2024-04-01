import { FC, useEffect } from 'react'
import './BackDrop.scss'
import lockBody from '../../utils/lockBody'

type Props = {
    active: boolean
    close: () => void
}
const BackDrop: FC<Props> = ({ active, close }) => {
    useEffect(() => {
        lockBody(active)
    }, [active])

    return (
        <div onClick={close} className={`backdrop ${active ? 'active' : ''}`} />
    )
}

export default BackDrop
