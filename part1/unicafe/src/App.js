import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(prev => prev + 1)
  }

  const handleNeutral = () => {
    setNeutral(prev => prev + 1)
  }

  const handleBad = () => {
    setBad(prev => prev + 1)
  }

  const total = good + neutral + bad;

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <hr />
      <p>TOTAL {total}</p>
      <p>AVERAGE {(good - bad) / total}</p>
      <p>POSITIVE {(good / total) * 100} %</p>
    </>
  )
}

export default App