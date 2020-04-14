import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const AnswerObj = (label, setState, state) => ({
    label,
    clickHandler() { setState(state + 1) },
    state
})
const getAverageRating = (good, bad, total) => (good - bad) / total
const getPercentage = (total, part) => `${(part / total) * 100}%`

const Button = ({ label, clickHandler }) => <button onClick={clickHandler}>{label}</button>
const Statistic = ({ label, value }) => (<tr>
    <td>{label}</td>
    <td>{value}</td>
</tr>)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const possibleAnswers = [
        AnswerObj('good', setGood, good),
        AnswerObj('neutral', setNeutral, neutral),
        AnswerObj('bad', setBad, bad)
    ]
    const allClicks = good + bad + neutral

    return (
        <>
            <h1>Rate us</h1>
            <div>
                {
                    possibleAnswers.map(({ label, clickHandler }, i) => (
                        <Button
                            label={label}
                            clickHandler={clickHandler}
                            key={i} />
                    ))
                }
            </div>
            <h2>Statistics</h2>
            {allClicks ?
                <table>
                    <tbody>
                        {
                            possibleAnswers.map(({ label, state }, i) => (
                                <Statistic
                                    label={label}
                                    value={state}
                                    key={i} />
                            ))
                        }
                        <Statistic
                            label='all'
                            value={allClicks}
                        />
                        <Statistic
                            label='average'
                            value={getAverageRating(
                                good,
                                bad,
                                allClicks)}
                        />
                        <Statistic
                            label='positive'
                            value={getPercentage(allClicks, good)}
                        />
                    </tbody>
                </table>
                : 'No feedback given yet'
            }
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))