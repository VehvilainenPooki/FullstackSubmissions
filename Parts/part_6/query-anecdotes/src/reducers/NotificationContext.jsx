import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW':
      return action.payload
      case 'RESET':
      return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notifDispatch] = useReducer(notificationReducer, 0)

  return (
    <NotificationContext.Provider value={{ notification: notification, notifDispatch: notifDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
