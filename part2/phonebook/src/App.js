import { useEffect, useState } from 'react'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [notification, setNotification] = useState(null)
  const [newName, setNewName] = useState({
    name: '',
    number: '',
    id: ''
  })

  useEffect(() => {
    personService.getPersons()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleSearch = (e) => {
    setSearchWord(e.target.value)
  }

  const filteredArray = persons.filter(person => person.name.toLowerCase().includes(searchWord.toLowerCase()));

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewName(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName.name)) {
      if (window.confirm(`${newName.name} is already added to phonebook, replace the old number with a new one?`)) {
        const targetedId = persons.filter(person => person.name === newName.name)[0].id;

        personService.updatePerson(targetedId, newName).then(updatedPerson => {
          setPersons(persons.map(person => person.id !== targetedId ? person : updatedPerson))
          setNotification(`Contact named ${newName.name} updated successfully!`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
      }
      setNewName({ name: '', number: '', id: '' })
    } else {
      personService.createPerson(newName)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName({ name: '', number: '', id: '' })
          setNotification(`New contact named ${newName.name} added successfully!`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchWord={searchWord} handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} />
      <Notificacion message={notification} />

      <h2>Numbers</h2>
      {searchWord ? filteredArray.map(person => <Person persons={persons} setPersons={setPersons} key={person.id} person={person} />) : persons.map(person => <Person persons={persons} setPersons={setPersons} key={person.id} person={person} />)}
    </div>
  )
}

export default App

const Filter = ({ searchWord, handleSearch }) => {
  return (
    <>
      <span>Filter shown by</span><input value={searchWord} onChange={handleSearch} />
    </>
  )
}

const PersonForm = ({ handleSubmit, newName, handleChange }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName.name} onChange={handleChange} name='name' />
        </div>
        <br />
        <div>number: <input value={newName.number} onChange={handleChange} name='number' /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Person = ({ person, persons, setPersons }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id)
      setPersons(persons.filter(item => item.id !== person.id))
    }
  }
  return (
    <>
      <p>{person.name} {person.number}</p><button onClick={handleDelete}>delete</button>
    </>
  )
}

const Notificacion = ({ message }) => {
  const style = {
    border: '2px solid green',
    color: 'green',
    fontWeight: 'bolder',
    padding: 10,
    margin: 5
  }
  if (message === null) {
    return;
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}