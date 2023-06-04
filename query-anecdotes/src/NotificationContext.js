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
  const [notifycation] = useContext(NotoficationContext)
  return notifycation
}

export const useNotify = (content, duration) => {
  const NotoficationAndDispatch = useContext(NotoficationContext)
  const dispatch = NotoficationAndDispatch[1]
  return (content) => {
    dispatch(content)
    setTimeout(() => dispatch(''), duration)
  }
}


export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')
  
  return (
    <NotoficationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotoficationContext.Provider>
  )
}


export default NotoficationContext