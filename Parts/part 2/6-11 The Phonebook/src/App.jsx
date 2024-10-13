import { useEffect, useState } from 'react'
import axios from 'axios'

import Person from './components/Person'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import ListNumbers from './components/listNumbers'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('load initial state')
    axios
    .get('http://localhost:3001/persons')
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
