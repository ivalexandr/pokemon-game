import cn from 'classnames'
import s from './style.module.css'

const NavBar = ({isActive, onClickHandler}) => {

  return (
    <nav className={s.root}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          LOGO
        </p>
        <a onClick={onClickHandler} className={cn(s.menuButton, {[s.active]: isActive})} href="/">
          <span />
        </a>
      </div>
    </nav>
  )
}

export { NavBar }