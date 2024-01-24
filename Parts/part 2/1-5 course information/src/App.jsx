
const Course = ({course}) => {
  let total = course.parts.reduce((s, p) => s + p.exercises, 0, )
  
  return (
    <div>
      <Header text={course.name}/>
      <Content parts={course.parts}/>
      <b>Total of {total} Exercises</b>
     </div>
  )
}

const Header = ({text}) => {
  return (
    <div>
      <h2>{text}</h2>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} text={part.name} number={part.exercises}/>)}
    </div>
  )
}

const Part = ({text, number}) => {
  return (
    <div>
      <p>{text} {number}</p>
    </div>
  )
}

/*Half Stack application development
Fundamentals of React 10

Using props to pass data 7

State of a component 14

Number of exercises 31*/

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

export default App
