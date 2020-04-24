import React from 'react'

const Weather = ({ current: {
    temperature,
    feelslike,
    weather_icons,
    weather_descriptions,
    wind_speed
} }) => {
    return <>
        <img src={weather_icons[0]} alt={weather_descriptions} />
        <p>Windspeed {wind_speed} km/h, temperature {temperature}°C, feels like {feelslike}°C</p>
    </>
}

export default Weather