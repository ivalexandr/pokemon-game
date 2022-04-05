import { useState } from "react"
import { Menu } from "../Menu"
import { NavBar } from "../NavBar"

const MenuHeader = () => {
  const [isActive, setActive] = useState(false)
  const [type, setType] = useState()

  const clickHandler = event => {
    event.preventDefault()
    setActive(prev => !prev)
    setType(isActive ? 'deactive' : 'active')
  }

  return (
    <>
      <Menu type={type}/>
      <NavBar onClickHandler={clickHandler} isActive={isActive}/>
    </>
  )
}

export { MenuHeader }