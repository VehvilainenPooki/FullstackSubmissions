import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import ListNumbers from './components/listNumbers'

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
        <Filter filter={newFilter} change={handleFilterChange}/>
      <h2>add a new</h2>
        <AddForm
          submit={addContact}
          
          name={newName}
          nameChange={handleNameChange}

          number={newNumber}
          numberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
        <ListNumbers personList={persons} filter={newFilter}/>
    </div>
  )
}

export default App
