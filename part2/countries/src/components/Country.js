import React, { useState, useEffect } from 'react'
import Weather from './Weather'

const Country = ({ data: { name, capital, population, languages, flag } }) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        fetch(
            `http://api.weatherstack.com/current?access_key=${
            process.env.REACT_APP_WEATHER_API_KEY
            }&query=${
            capital
            }`)
            .then(data => data.json())
            .then((res) => {
                setWeather(res)
            })
        // eslint-disable-next-line
    }, [])

    return <article>
        <h2>{name}</h2>
        <div>Capital: {capital}</div>
        <div>Population: {new Intl.NumberFormat().format(population)}</div>
        <h3>Languages</h3>
        <ul>
            {languages.map(l => <li key={l.name}>{l.name}</li>)}
        </ul>
        <img src={flag} alt={`The flag of ${name}`} width="320" height="180" />
        {weather.current?.temperature && <>
            <h3>Weather in {capital}</h3>
            <Weather current={weather.current} />
        </>
        }
    </article>
}

export default Country