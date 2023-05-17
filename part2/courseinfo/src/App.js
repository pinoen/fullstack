const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 15,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  return (
    <p style={{ fontWeight: 'bold' }}>Number of exercises {parts.reduce((acc, curr) => acc + curr.exercises, 0)}</p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}
