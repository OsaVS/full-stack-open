import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/personService'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState({message: '', type: ''})

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') {
      alert(`Fill all fields`)
      return
    }

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (confirm(`"${newName}" is already added to phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const updatedPerson = { ...personToUpdate, number: newNumber }

        personService
          .updateNumber(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')

            setNotification({
              message: `Updated ${returnedPerson.name}'s number`, 
              type:'success'
            })
            setTimeout(() => {
              setNotification({message: '', type: ''})
            }, 5000)
          })
          .catch(error => {
            setNotification({
              message: `Information of '${newName}' has already been removed from server`, 
              type:'error'
            })
            setTimeout(() => {
              setNotification({message: '', type: ''})
            }, 5000)
            setPersons(persons.filter(person => person.id !== personToUpdate.id))
          })
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setNotification({
          message: `Added ${returnedPerson.name}`, 
          type:'success'
        })
        setTimeout(() => {
          setNotification({message: '', type: ''})
        }, 5000)
      })
  }

  const contactsToShow = filterName === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )

  const handleDelete = (contact) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return
    }

    personService
      .deletePerson(contact.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== contact.id))
      })
      .catch(error => {
        setNotification({
          message: `Information of '${contact.name}' has already been removed from server`, 
          type:'error'})
        setTimeout(() => {
          setNotification({message: '', type: ''})
        }, 5000)
        setPersons(persons.filter(person => person.id !== contact.id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {notification.message && <Notification message={notification.message} type={notification.type}/>}

      <Filter onChange={handleFilterNameChange} value={filterName} />

      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={handleContactSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        name={newName}
        number={newNumber} />

      <h3>Numbers</h3>

      <Persons persons={contactsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App