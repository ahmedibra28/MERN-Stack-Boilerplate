import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = () => {
  const { auth } = useAuth()
  const location = useLocation()

  return auth?.userRole?.clientPermission
    ?.map((path) => path?.path)
    ?.includes(location.pathname) ? (
    <Outlet />
  ) : auth?.userInfo ? (
    <Navigate to='/' state={{ from: location }} replace />
  ) : (
    <Navigate
      to={`/auth/login?next=${location.pathname}`}
      state={{ from: location }}
      replace
    />
  )
}

export default RequireAuth
