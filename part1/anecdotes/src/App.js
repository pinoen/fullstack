import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const getDefaultArray = () => {
    let obj = {};
    for (let i = 1; i < anecdotes.length + 1; i++) {
      obj[i] = 0;
    }
    return obj;
  };

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(getDefaultArray)

  const randomIndex = Math.floor(Math.random() * anecdotes.length)
  const values = Object.values(points)
  const greaterValue = Math.max(...values)
  const greaterValueIndex = values.indexOf(greaterValue)

  const handleClick = () => {
    setSelected(randomIndex)
  }

  const handleVote = (id) => {
    setPoints((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected + 1]} votes</p>
      <button onClick={() => handleVote(selected + 1)}>vote</button><button onClick={handleClick}>next anecdote</button>

      <h1>Anecdote with more votes</h1>
      {anecdotes[greaterValueIndex]}
    </div>
  )
}

export default App