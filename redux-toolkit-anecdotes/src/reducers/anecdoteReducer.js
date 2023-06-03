import { createSlice } from "@reduxjs/toolkit"
import anecdoteServise from '../service/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      const newObject = action.payload
      const { id } = newObject

      return state.map(
        a => a.id === id ? 
          newObject :
          a
      )
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServise.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNew = content => {
  return async (dispatch) => {
    const newObject = await anecdoteServise.createNew(content)
    dispatch(createAnecdote(newObject))
  }
}

export const updateAnecdote = anencdote => {
  const objectToUpdate = { ...anencdote, votes: anencdote.votes + 1 }
  return async (dispatch) => {
    const newObject = await anecdoteServise.update(objectToUpdate)
    dispatch(vote(newObject))
  }
}

export default anecdoteSlice.reducer