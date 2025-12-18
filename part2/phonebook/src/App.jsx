import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

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
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({
      name: newName,
      number: newNumber
    }))

    setNewName('')
    setNewNumber('')
  }

  const contactsToShow = filterName === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleFilterNameChange} value={filterName} />

      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={handleContactSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        name={newName}
        number={newNumber} />

      <h3>Numbers</h3>

      <Persons persons={contactsToShow} />
    </div>
  )
}

export default App