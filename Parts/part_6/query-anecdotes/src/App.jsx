import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, voteAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const newAnecMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (old) => [...old, newAnecdote])
    }
  })

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (votedAnec) => {
      queryClient.setQueryData(['anecdotes'], (old) => 
        old.map(anec => anec.id === votedAnec.id ? votedAnec : anec)
      )
    }
  })

  const handleVote = async (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.error) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm createAnec={newAnecMutation} />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App