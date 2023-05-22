import { hideNotification, showNotification } from "./notificationReducer"

export const showAndHideNotification = (content, dispatch) => {
  dispatch(showNotification(content))

  setTimeout(() => {
    dispatch(hideNotification())
  }, 3000)
}