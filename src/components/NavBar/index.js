import { useState } from 'react'
import cn from 'classnames'
import s from './style.module.css'

const NavBar = () => {
  const [isActive, setActive] = useState(false)

  return (
    <nav className={s.root}>
      <div className={s.navWrapper}>
        <p class={s.brand}>
          LOGO
        </p>
        <a className={cn(s.menuButton, {[s.active]: isActive})} href="/">
          <span />
        </a>
      </div>
    </nav>
  )
}

export { NavBar }