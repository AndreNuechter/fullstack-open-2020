import React from 'react'
import Country from './Country'
import CountryList from './CountryList'

const Content = ({ matched, setSearch }) => {
    if (!matched.length) return <p>No results</p>
    else if (matched.length > 10) return <p>Too many results</p>
    else if (matched.length === 1) return <Country data={matched[0]} />
    return <CountryList countries={matched} setSearch={setSearch} />
}

export default Content