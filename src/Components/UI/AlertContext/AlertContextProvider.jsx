import AlertContext from './AlertContext'
import { useState, useCallback, useRef, useEffect } from 'react'

const AlertContextProvider = (props) => {
  const ALERT_TIME = 2000
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')
  const timeoutRef = useRef(null)

  const setAlert = useCallback((type, message) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setType(type)
    setMessage(message)

    timeoutRef.current = setTimeout(() => {
      setType('')
      setMessage('')
      timeoutRef.current = null
    }, ALERT_TIME)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const value = {
    type: type,
    message: message,
    setAlert: setAlert,
  }
  return <AlertContext.Provider value={value}>{props.children}</AlertContext.Provider>
}
export default AlertContextProvider
