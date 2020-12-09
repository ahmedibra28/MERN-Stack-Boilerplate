import { useState, useEffect } from 'react'

const Message = ({ variant, children }) => {
  const [alert, setAlert] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert(false)
    }, 5000)

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
