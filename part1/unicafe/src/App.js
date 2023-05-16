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
      <Button handleClick={handleGood} text={"good"} />
      <Button handleClick={handleNeutral} text={"neutral"} />
      <Button handleClick={handleBad} text={"bad"} />

      {total > 0 ? <Statistics good={good} neutral={neutral} bad={bad} total={total} /> : <p>No feedback given</p>}
    </div>
  )
}

export default App

const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <>
      <h1>Statistics</h1>
      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <hr />
      <StatisticLine text={"TOTAL"} value={total} />
      <StatisticLine text={"AVERAGE"} value={(good - bad) / total} />
      <StatisticLine text={"POSITIVE"} value={(good / total) * 100} />
    </>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text} {value} {text === "POSITIVE" && "%"}</p>
  )
}