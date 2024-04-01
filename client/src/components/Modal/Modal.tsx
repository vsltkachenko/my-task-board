import { FC } from 'react'

import './Modal.scss'

import { AiOutlineClose } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { modalClose } from '../../store/appReducer'
import TaskDetails from '../TaskDetails'
import CreateList from '../CreateList'

const Modal: FC = () => {
    const { modalType, modalActive: active } = useAppSelector(
        (state) => state.app
    )
    const dispatch = useAppDispatch()

    return (
        <div
            className={`modal ${active ? 'active' : ''}`}
            onClick={() => dispatch(modalClose())}
        >
            <div className="modal__box">
                <div
                    className="modal__content"
                    onClick={(e) => e.stopPropagation()}
                >
                    {modalType === 'TaskDetails' ? (
                        <TaskDetails editMode={false} />
                    ) : modalType === 'TaskDetailsEdit' ? (
                        <TaskDetails editMode={true} />
                    ) : modalType === 'NewTask' ? (
                        <TaskDetails editMode={true} newTask={true} />
                    ) : (
                        <CreateList />
                    )}
                    <button
                        className={`btn-close ${modalType === 'CreateNewList' ? 'text-slate-700' : ''}`}
                        onClick={() => dispatch(modalClose())}
                    >
                        <AiOutlineClose size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
