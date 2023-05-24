import { useDispatch, useSelector } from "react-redux"
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    let sorted;
    if(filter === '') {
      sorted = [ ...anecdotes ]
    } else {
      sorted = anecdotes.filter(a => a.content.includes(filter))
    }
    return sorted.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
  }


  return (
    <div>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
      )}
    </div>
  )
}

export default AnecdoteList