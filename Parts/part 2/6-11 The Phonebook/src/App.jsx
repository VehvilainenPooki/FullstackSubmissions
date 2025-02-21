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
      if (window.confirm(newName + " is already added to phonebook, replace the old number with a new one?")) {
        const contactObject = persons.find(person => person.name == newName)
        console.log(contactObject)
        contactObject.number = newNumber
        console.log(contactObject)
        personService
        .update(contactObject.id, contactObject)
        .then(() => {
          persons[persons.findIndex(person => person.name == contactObject.name)] = contactObject
          setPersons(persons)
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      const newId = persons.length != 0 ? String(Number(persons.at(-1).id) + 1) : "1"

      const contactObject = {
        name: newName,
        number: newNumber,
        id: newId,
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

  const handlePersonDelete = (event) => {
    console.log(event.target.value)    

    var deleteId = event.target.value

    const deletePerson = persons.find((person) => person.id === deleteId)
    if (window.confirm(`Delete ${deletePerson.name}?`) === false) {
      return
    }

    personService
    .deleteEntry(deleteId)
    .then(() => {
      setPersons(persons.filter(person => person.id !== deleteId))
    })
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
        <ListNumbers personList={persons} filter={newFilter} removeEvent={handlePersonDelete}/>
    </div>
  )
}

export default App
