
const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name}/>
      <Content parts={course.parts}/>
     </div>
  )
}

const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part text={parts[0].name}number={parts[0].exercises}/>
      <Part text={parts[1].name}number={parts[1].exercises}/>
      <Part text={parts[2].name}number={parts[2].exercises}/>
    </div>
  )
}

const Part = ({text, number}) => {
  return (
    <div>
      <p>{text} {number}</p>
      <p></p>
    </div>
  )
}

/*Half Stack application development
Fundamentals of React 10

Using props to pass data 7

State of a component 14

Number of exercises 31*/

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
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App
