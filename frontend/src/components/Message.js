import { useEffect, useState } from 'react'

const Message = ({ variant, children }) => {
  const [alert, setAlert] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert(false)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  }, [alert])

  return (
    alert && (
      <div
        className={`alert alert-${variant} animate__animated animate__swing`}
      >
        {children}
      </div>
    )
  )
}

export default Message
