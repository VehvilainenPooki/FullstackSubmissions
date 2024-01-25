import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      number: '040-904-145'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const addContact = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)) {
      alert(newName + " is already added to phonebook")
    } else {
      const contactObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target)
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target)
      setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          <form onSubmit={addContact}>
            name: <input title='name' id='1'
              value={newName}
              onChange={handleNameChange}
            />
            <br></br>
            number: <input title='number' id='2'
              value={newNumber}
              onChange={handleNumberChange}
            />
            <br></br>
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