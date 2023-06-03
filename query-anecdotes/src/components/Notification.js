import { useNotificatinValue } from "../notificationReducer"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const info = useNotificatinValue()
  
  if (info === '') return null

  return (
    <div style={style}>
      {info}
    </div>
  )
}

export default Notification
