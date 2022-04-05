import cn from 'classnames'
import s from './style.module.css'

const Menu = ({ isActive, onClickHandler }) => {

  const clickHandler = event => {
    onClickHandler && onClickHandler(event)
  }

  const MENU = [
    {
      title:'HOME',
      to: '/'
    },
    {
      title:'GAME',
      to: '/game'
    },
    {
      title:'ABOUT',
      to: '/about'
    },
    {
      title:'CONTACT',
      to: '/contact'
    },
  ]
  return (
    <div className={cn(s.menuContainer, {
      [s.active]: isActive === true,
      [s.deactive]: isActive === false
    } )}>
      <div className={s.overlay} /> 
        <div className={s.menuItems}>
          <ul>
            {
              MENU.map(({ title, to }) => {
                return (
                  <li key={to}>
                    <a href={to} onClick={clickHandler} data-menu>
                      {title}
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
    </div>
  )
}

export { Menu }