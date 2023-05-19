import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [newName, setNewName] = useState({
    name: '',
    number: '',
    id: ''
  })

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
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
      axios.post('http://localhost:3001/persons', newName)
        .then(res => {
          setPersons(persons.concat(res.data))
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
      {searchWord ? filteredArray.map(person => <Person key={person.id} person={person} />) : persons.map(person => <Person key={person.id} person={person} />)}
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

const Person = ({ person }) => {
  return (
    <>
      <p>{person.name} {person.number}</p>
    </>
  )
}