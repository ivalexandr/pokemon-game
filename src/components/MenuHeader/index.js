import { useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu } from "../Menu"
import { NavBar } from "../NavBar"

const MenuHeader = () => {
  const [isActive, setActive] = useState()
  const location = useLocation()
  const navigate = useNavigate()

  const clickHandler = event => {
    event.preventDefault()
    setActive(prev => !prev)
    if (event.target.dataset.menu) {
      navigate(event.target.getAttribute('href'))
    }
  }

  return (
    <>
      <NavBar onClickHandler={clickHandler} isActive={isActive} bgActive={!(location.pathname === '/')} />
      <Menu isActive={isActive} onClickHandler = {clickHandler} />
    </>
  )
}

export { MenuHeader }