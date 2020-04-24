import React from 'react'

const CountryList = ({ countries, setSearch }) => <ul>
    {countries.map(({ name }) => <li key={name}>
        {name}
        <button onClick={({ target }) => setSearch(
            target.previousSibling.data
        )}>show</button>
    </li>)}
</ul>

export default CountryList