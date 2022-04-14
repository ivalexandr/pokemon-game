import { Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  if (!localStorage.getItem('idToken')) return <Navigate to="/" replace />
  return null
}

export { PrivateRoute }