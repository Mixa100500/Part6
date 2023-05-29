import reducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

describe('reducer', () => {
  let state

  beforeEach(() => {
    state = anecdotesAtStart.map(asObject)
  })

  test('can vote for the anecdote', () => {
    const action = {
      type: 'vote',
      payload: { id: state[1].id }
    }

    const newState = reducer(state, action)
    deepFreeze(state)
    expect(newState[1].votes).toEqual(1)
  })
})