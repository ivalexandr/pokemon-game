import { Outlet } from 'react-router-dom'
import { MenuHeader } from '../MenuHeader'

const LayoutPage = () => {
  return (
    <>
      <MenuHeader />
      <Outlet />
    </>
  )
}

export { LayoutPage }