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

export const { showNotification, hideNotification } = notificationReducer.actions
export default notificationReducer.reducer