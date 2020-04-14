import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ text, votes }) => <div>
    <blockquote>{text}</blockquote>
    <div>This anecdote has been voted for {votes || 0} time{votes !== 1 ? 's' : ''}</div>
</div>
const Button = ({ label, clickHandler }) => <button onClick={clickHandler}>{label}</button>
const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState({})
    const [mostVotedFor, setMostVotedFor] = useState({ count: -1, id: null })
    const voteHandler = () => {
        const value = (selected in votes)
            ? votes[selected] + 1
            : 1
        setVotes({
            ...votes,
            [selected]: value
        })
        if (value > mostVotedFor.count) {
            setMostVotedFor({
                count: value,
                id: selected
            })
        }
    }
    const randomAnecdoteHandler = () => setSelected(getRandomAnecdote())

    return (
        <>
            <h1>Anecdotes</h1>
            <h2>Anecdote of the day</h2>
            <Anecdote text={props.anecdotes[selected]} votes={votes[selected]} />
            <Button clickHandler={voteHandler} label="Vote" />
            <Button clickHandler={randomAnecdoteHandler} label="Get random anecdote" />
            {mostVotedFor.count > -1 &&
                <>
                    <h2>Anecdote most voted for</h2>
                    <Anecdote text={props.anecdotes[mostVotedFor.id]} votes={votes[mostVotedFor.id]} />
                </>
            }
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const getRandomAnecdote = () => Math.floor(Math.random() * anecdotes.length)

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)