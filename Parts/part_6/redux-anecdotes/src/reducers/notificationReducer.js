import { createSlice, current } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    counter: 0
  },
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload,
        counter: current(state).counter + 1
      }
    },
    removeNotification(state, action) {
      if (action.payload === current(state).counter) {
        return { message: '', counter: 0 }
      }
      return state
    }
  }
})

export const createNotification = (text, time) => {
  return async (dispatch, getState) => {
    const counter = getState().notification.counter
    dispatch(setNotification(text))
    
    setTimeout(() => {
      dispatch(removeNotification(counter + 1))
    }, time * 1000)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
