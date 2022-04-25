import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { openModal } from '../../redux/reducers/modalReducer'
import { logoutUser, selectIsProfileOpen, selectUser, toggleProfile } from '../../redux/reducers/userReducer'
import { LoginSVG } from '../LoginSVG'
import { ProfileSVG } from '../ProfileSVG'
import { Profile } from '../Profile'
import logo from '../../assets/img/logo.png'
import cn from 'classnames'
import s from './style.module.css'

const NavBar = ({isActive, onClickHandler, bgActive = true}) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isProfileOpen = useSelector(selectIsProfileOpen)

  const openModalHandler = () => {
    !user
    ? dispatch(openModal())
    : dispatch(toggleProfile())
  }

  const clickProfileHandler = () => {
    dispatch(logoutUser())
  }

  return (
    <nav className={cn(s.root, {[s.bgActive]: bgActive})}>
      <div className={s.navWrapper}>
        <Link to={'/'} className={s.brand}>
          <img src={ logo } alt="logo" />
        </Link>
        <div className={s.menuGroup}>
          <div className={s.loginSvg} onClick = {openModalHandler}>
            { user ? <ProfileSVG /> : <LoginSVG /> }
            {isProfileOpen && <Profile onClickHandler={clickProfileHandler}/>}
          </div>
          <a onClick={onClickHandler} className={cn(s.menuButton, {[s.active]: isActive})} href="/">
            <span />
          </a>
        </div>
      </div>
    </nav>
  )
}

export { NavBar }