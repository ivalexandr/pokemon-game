import { useDispatch } from 'react-redux'
import { openModal } from '../../redux/reducers/modalReducer'
import { LoginSVG } from '../LoginSVG'
import cn from 'classnames'
import s from './style.module.css'

const NavBar = ({isActive, onClickHandler, bgActive = true}) => {
  const dispatch = useDispatch()

  const openModalHandler = () =>  dispatch(openModal())

  return (
    <nav className={cn(s.root, {[s.bgActive]: bgActive})}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          LOGO
        </p>
        <div className={s.menuGroup}>
          <div className={s.loginSvg} onClick = {openModalHandler}>
            <LoginSVG />
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