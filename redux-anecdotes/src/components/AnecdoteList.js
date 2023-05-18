import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    let sorted;
    if(state.filter === '') {
      sorted = state.anecdotes; 
    } else {
      sorted = state.anecdotes.filter(a => a.content.includes(state.filter))
    }
    return sorted.sort((a, b) => b.votes - a.votes);
  })

  const dispatch = useDispatch()
  return (
    <div>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
        </div>
      </div>
      )}
    </div>
  )
}

export default AnecdoteList