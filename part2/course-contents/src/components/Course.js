import React from 'react'

const Header = ({ course: { name } }) => (
    <h1>{name}</h1>
)

const Total = ({ course: { parts } }) => {
    const sum = parts
        .reduce((total, { exercises: count }) => total + count, 0)
    return (
        <p style={{ fontWeight: 'bold' }}>Number of exercises {sum}</p>
    )
}

const Part = ({ part: { name, exercises } }) => (
    <p>{name} {exercises}</p>
)

const Content = ({ course: { parts } }) => (
    <div>
        {parts.map(part => <Part part={part} key={part.id} />)}
    </div>
)

const Course = ({ course }) => <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
</>

export default Course