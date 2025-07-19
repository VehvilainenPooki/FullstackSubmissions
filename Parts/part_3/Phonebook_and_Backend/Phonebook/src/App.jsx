import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import AddForm from './components/AddForm'
import ListNumbers from './components/listNumbers'
import Notification from './components/Notification'

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
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)



  const addContact = (event) => {
    event.preventDefault()
    if (newName == "" || newNumber == "") {
      handleNotifications(`Name or number is empty.`, false)
    } else if (persons.some(person => person.name === newName)) {
      if (window.confirm(newName + " is already added to phonebook, replace the old number with a new one?")) {
        const contactObject = persons.find(person => person.name == newName)
        contactObject.number = newNumber

        personService
        .update(contactObject.id, contactObject)
        .then(() => {
          persons[persons.findIndex(person => person.name == contactObject.name)] = contactObject
          setPersons(persons)
          setNewName('')
          setNewNumber('')
          handleNotifications(`${contactObject.name} number was changed successfully.`, true)
        }).catch(error => {
          handleNotifications(error.response.data.error, false)
        })
      }
    } else {
      const contactObject = {
        name: newName,
        number: newNumber,
      }

      personService
      .create(contactObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        handleNotifications(`${contactObject.name} was added successfully.`, true)
      }).catch(error => {
          handleNotifications(error.response.data.error, false)
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
    }).catch(error => {
      handleNotifications(`Entry not found on server.`, false)
      console.log(`error: ${error}`)
    })
  }

  const handleNotifications = (notification, successful) => {
    if (successful) {
      setSuccessMessage(
        `${notification}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } else {
      setErrorMessage(
        `${notification}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

      <Notification message={successMessage} messageType={'success'} />
      <Notification message={errorMessage} messageType={'error'}/>


      <h2>Numbers</h2>
        <ListNumbers personList={persons} filter={newFilter} removeEvent={handlePersonDelete}/>
    </div>
  )
}

export default App
