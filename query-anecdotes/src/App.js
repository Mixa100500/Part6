import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdotes } from './requests'
import { useNotify } from './NotificationContext'

const App = () => {
  const notifyWith = useNotify()
  
  const handleVote = (anecdote) => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    updateAnecdoteMutation.mutate(newAnecdote)
  }

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdotes, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const newAnecdotes = anecdotes.map(a => 
        a.id === updatedAnecdote.id ? 
          updatedAnecdote :
          a
        )
        queryClient.setQueryData('anecdotes', newAnecdotes)
        notifyWith(`anecdote '${newAnecdotes.content}' voted`)
    }
  })
  
  const result = useQuery(
      'anecdotes',
      getAnecdotes,
      {
        retry: 1,
        refetchOnWindowFocus: false
      }
    )
    
    if ( result.isLoading ) {
      return (
        <div>
          loading
        </div>
    )
  }
  
  if ( result.isError ) {
    return (
      <div>
        anecdote server not available due to problems in server
      </div>
    )
  }
  const anecdotes = result.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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

export default App
