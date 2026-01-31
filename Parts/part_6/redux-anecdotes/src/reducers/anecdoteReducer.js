import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers : {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteVote = state.find(anec => anec.id === id)
      const changedAnecdote = {content: anecdoteVote.content, id: anecdoteVote.id, votes: (anecdoteVote.votes + 1)}
      return state.map(anec => (anec.id !== id ? anec : changedAnecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
