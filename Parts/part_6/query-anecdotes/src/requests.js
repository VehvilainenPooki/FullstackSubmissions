const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content : newAnecdote, votes : 0 })
  }
 
  const response = await fetch(baseUrl, options)
 
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
 
  return await response.json()
}

export const voteAnecdote = async (votedAnec) => {
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id : votedAnec.id, votes : votedAnec.votes + 1 })
  }
 
  const response = await fetch(`${baseUrl}/${votedAnec.id}`, options)
 
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
 
  return await response.json()
}
