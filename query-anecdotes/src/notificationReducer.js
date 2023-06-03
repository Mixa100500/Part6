import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET':
      return action.payload
    case 'DEL':
      return ''
    default:
      return state
  }
}

const NotoficationContext = createContext()

export const useNotificatinValue = () => {
  const NotoficationAndDispatch = useContext(NotoficationContext)
  return NotoficationAndDispatch[0]
}

export const useNotificatinDispatch = () => {
  const NotoficationAndDispatch = useContext(NotoficationContext)
  return NotoficationAndDispatch[1]
}


export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useReducer(notificationReducer, '')

  const showAndHideNotification = (info, duration = 5000) => {
    setNotification({ type: 'SET', payload: info })
    setTimeout(() => setNotification({ type: 'DEL' }), duration)
  }
  
  return (
    <NotoficationContext.Provider value={[notification, showAndHideNotification]}>
      {props.children}
    </NotoficationContext.Provider>
  )
}


export default NotoficationContext