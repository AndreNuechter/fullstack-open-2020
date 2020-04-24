import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Content from './components/Content'

const App = () => {
    const [search, setSearch] = useState('')
    const [matched, setMatched] = useState([])
    const [countries, setCountries] = useState([])

    useEffect(() => {
        fetch(
            'https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag'
        )
            .then(res => res.json())
            .then(res => {
                setCountries(res)
            })
    }, [])

    useEffect(() => setMatched(countries
        .filter(c => search
            && c.name
                .toLowerCase()
                .includes(search.toLowerCase()))),
        [search, countries])

    return <>
        <h1>Countries</h1>
        <input value={search} onChange={({ target }) => setSearch(target.value)} />
        <Content matched={matched} setSearch={setSearch} />
    </>
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)