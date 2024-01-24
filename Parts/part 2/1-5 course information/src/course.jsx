
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

export default Course
