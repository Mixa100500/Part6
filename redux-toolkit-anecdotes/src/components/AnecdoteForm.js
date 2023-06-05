import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNew(content))
    dispatch(setNotification(`created ${content} anecdote`))
  }

  return (
    <form onSubmit={addAnecdote}>
        <h2>create new</h2>
        <div>
          <input name='anecdote'/>
          <button type='submit'>create</button>
        </div>
    </form>
  )
}
export default AnecdoteForm