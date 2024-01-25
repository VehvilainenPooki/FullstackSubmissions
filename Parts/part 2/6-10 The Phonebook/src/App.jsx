import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas'
    }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)) {
      alert(newName + " is already added to phonebook")
    } else {
      const contactObject = {
        name: newName,
        id: persons.length + 1,
      }
      setPersons(persons.concat(contactObject))
      setNewName('')
    }
  }

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          <form onSubmit={addName}>
            name: <input
              value={newName}
              onChange={handleInputChange}
            />
            <button type="submit">add</button>
          </form>
        </div>
      <h2>Numbers</h2>
      {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
    </div>
  )
}

export default App