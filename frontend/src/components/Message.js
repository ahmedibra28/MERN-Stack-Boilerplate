import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { CLEAR_ALERTS } from '../constants/userConstants'

const Message = ({ variant, children }) => {
  const [alert, setAlert] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert(false)
      dispatch({ type: CLEAR_ALERTS })
    }, 4000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  return alert && <div className={`alert alert-${variant}`}>{children}</div>
}

Message.defaultPros = {
  variant: 'info',
}

export default Message
