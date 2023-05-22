import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'
import { showAndHideNotification } from "../reducers/notificationActions";

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
    dispatch(vote(anecdote.id))
    showAndHideNotification(anecdote.content, dispatch)
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