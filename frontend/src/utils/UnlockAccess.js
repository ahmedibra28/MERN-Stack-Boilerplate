import useAuth from '../hooks/useAuth'

export const UnlockAccess = (roles) => {
  const { auth } = useAuth()
  return roles.includes(auth?.userInfo.group)
}

export const Access = {
  admin: ['admin'],
  user: ['user'],
  adminUser: ['admin', 'user'],
}
