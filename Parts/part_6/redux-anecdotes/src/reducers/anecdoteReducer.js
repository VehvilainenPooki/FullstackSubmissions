const anecdotesAtStart = [
  ['If it hurts, do it more often', 0, 0],
  ['Adding manpower to a late software project makes it later!', 1, 1],
  ['The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', 2, 2],
  ['Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 3, 3],
  ['Premature optimization is the root of all evil.', 4, 4],
  ['Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', 5, 5]
]

const asObject = anecdote => {
  return {
    content: anecdote[0],
    id: anecdote[1],
    votes: anecdote[2]
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.payload]
    case 'VOTE': {
      const id = action.payload.id
      const anecdoteVote = state.find(anec => anec.id === id)
      const changedAnecdote = {content: anecdoteVote.content, id: anecdoteVote.id, votes: (anecdoteVote.votes + 1)}
      return state.map(anec => (anec.id !== id ? anec : changedAnecdote))
    }
    default:
      return state
  }
}

export const createAnecdote = (state = initialState, anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content: anecdote,
      id: state.length,
      votes: 0
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export default anecdoteReducer
