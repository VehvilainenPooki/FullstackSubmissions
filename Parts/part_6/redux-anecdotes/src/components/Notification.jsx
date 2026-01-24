import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { removeNotification } from '../reducers/notificationReducer'


const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (notification) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const emptyStyle = {
    padding: 20.5,
    marginBottom: 10
  }

  if (notification) {
    return <div style={ style }>{ notification }</div>
  } else {
    return <div style={emptyStyle}></div>
  }
}

export default Notification
