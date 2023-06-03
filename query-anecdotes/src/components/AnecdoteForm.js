import { useMutation, useQueryClient } from "react-query"
import { createNew } from "../requests"
import { useNotificatinDispatch } from "../notificationReducer"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const showAndHideNotification = useNotificatinDispatch()

  const newNoteMutation = useMutation(createNew, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      showAndHideNotification(error.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
