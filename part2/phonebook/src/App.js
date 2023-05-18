import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState({
    name: '',
    number: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewName(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName.name)) {
      alert(`${newName.name} is already added to phonebook`)
      setNewName({ name: '', number: '' })
    } else {
      setPersons(persons.concat(newName))
      setNewName({ name: '', number: '' })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App