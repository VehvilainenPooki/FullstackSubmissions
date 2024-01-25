import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  
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

  const handleFilterChange = (event) => {
    console.log(event.target)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with<input title='filter' id='0'
            value={newFilter}
            onChange={handleFilterChange}
          />
        </div>
      <h2>add a new</h2>
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
      {persons.filter(person =>
        person.name.toLowerCase().includes(newFilter)
      ).map(person => 
          <Person key={person.id} person={person} />
        )}
    </div>
  )
}

export default App