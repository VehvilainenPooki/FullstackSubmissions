import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

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

const { setAnecdotes, createAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(anecdote))
  }
}

export const { vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
