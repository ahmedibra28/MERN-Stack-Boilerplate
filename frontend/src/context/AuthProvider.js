import { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,

    userRole: localStorage.getItem('userRole')
      ? JSON.parse(localStorage.getItem('userRole'))
      : null,
  })

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
