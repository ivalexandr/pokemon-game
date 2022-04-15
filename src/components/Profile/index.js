import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeProfile, selectUser } from '../../redux/reducers/userReducer'
import { getActiveUser } from '../../redux/reducers/userReducer/async/getUser'
import s from './style.module.css'

const Profile = ({ onClickHandler }) => {

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const rootRef = useRef()

  useEffect(() => {
    dispatch(getActiveUser())
  //eslint-disable-next-line
  }, [])

  const clickHandler = event => {
    if (!rootRef.current.contains(event.target)) {
      dispatch(closeProfile())
    }
  }

  return (
    <div className={s.root} ref={rootRef} onClick = {clickHandler}>
      <span className={s.email}> User: {user?.email} </span>
      <button onClick = {onClickHandler}>Logout</button>
    </div>
  )
}

export { Profile }