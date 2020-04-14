import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => (<h1>{course}</h1>)
const Part = ({ name, exercises }) => (<p>{name} {exercises}</p>)
const Content = ({ parts }) => parts
    .map(({ name, exercises }, i) => (<Part name={name} exercises={exercises} key={i} />))
const Total = ({ parts }) => <p>
    Number of exercises {parts.reduce((total, { exercises }) => total + exercises, 0)}
</p>

const App = () => {
    const PartObj = (name, exercises) => ({ name, exercises })
    const course = {
        name: 'Half Stack application development',
        parts: [
            PartObj('Fundamentals of React', 10),
            PartObj('Using props to pass data', 7),
            PartObj('State of a component', 14)
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))