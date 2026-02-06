import { useContext } from "react"
import NotificationContext from "../reducers/NotificationContext"

const AnecdoteForm = ({ createAnec }) => {
  const { notifDispatch } = useContext(NotificationContext)
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnec.mutate(content)
    notifDispatch({type: 'NEW', payload: `Anecdote: \"${content}\" added.`})
    setTimeout(() => {
      notifDispatch({type: 'RESET'})
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
