import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import AddForm from './components/AddForm'
import ListNumbers from './components/listNumbers'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('load initial state')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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

      personService
      .create(contactObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
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
