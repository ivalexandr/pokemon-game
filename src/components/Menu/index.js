import cn from 'classnames'
import s from './style.module.css'

const Menu = ({ type }) => {
  const MENU = [
    {
      title:'HOME',
      to: '#welcome'
    },
    {
      title:'GAME',
      to: '#game'
    },
    {
      title:'ABOUT',
      to: '#about'
    },
    {
      title:'CONTACT',
      to: '#contact'
    },
  ]
  return (
    <div className={cn(s.menuContainer, s[type] )}>
      <div className={s.overlay} /> 
        <div className={s.menuItems}>
          <ul>
            {
              MENU.map(({ title, to }) => {
                return (
                  <li key={to}>
                    <a href={to}>
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