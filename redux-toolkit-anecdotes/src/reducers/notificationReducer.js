import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isVisible: false,
  content: '',
}

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.isVisible = true
      state.content = action.payload
    },
    hideNotification(state) {
      state.isVisible = false
      state.content = ''
    }
  }
})

const { showNotification, hideNotification } = notificationReducer.actions

export const setNotification = (content, duration = 3000) => async (dispatch) => {
  dispatch(showNotification(content))

  setTimeout(() => {
    dispatch(hideNotification())
  }, duration)
}

export default notificationReducer.reducer