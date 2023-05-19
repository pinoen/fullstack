import { useEffect, useState } from 'react'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchWord, setSearchWord] = useState('')
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

  const filteredArray = persons.filter(person => person.name.toLocaleLowerCase().includes(searchWord.toLowerCase()));

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
      alert(`${newName.name} is already added to phonebook`)
      setNewName({ name: '', number: '', id: '' })
    } else {
      personService.createPerson(newName)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName({ name: '', number: '', id: '' })
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchWord={searchWord} handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} />

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