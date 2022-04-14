import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal, isOpen } from '../../redux/reducers/modalReducer'
import cn from 'classnames'
import s from './style.module.css'

const Modal = ({ children, title }) => {
  const modalRef = useRef()
  const isOpenModal = useSelector(isOpen)
  const dispatch = useDispatch()

  useEffect(() => {
    
    document.body.style.overflow = isOpenModal ? 'hidden' : null

  }, [isOpenModal])

  const closeModalHandler = event => {
    if (!modalRef.current.contains(event.target) || event.target.dataset.click) {
      dispatch(closeModal())
    }
  }

  return createPortal(
    (
      <div className={cn(s.root, {[s.open]: isOpenModal})} onClick={closeModalHandler} >
          <div className={s.modal} ref={modalRef}>
            <div className={s.head}>
              { title }
              <span className={s.btnClose} data-click/>
            </div>
            <div className={s.content}>
              { children }
            </div>
          </div>
      </div>
    ),
    document.getElementById('root-modal')
  ) 
}

export { Modal }