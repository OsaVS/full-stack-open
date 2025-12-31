import React, { use } from 'react'
import weatherService from '../services/weatherService'
import { useEffect } from 'react'

const Country = ({ country }) => {
    const [weather, setWeather] = React.useState(null)

    useEffect(() => {
        weatherService
            .getWeather(country.capital)
            .then(weatherData => {
                setWeather(weatherData)
            })
    }, [country.capital])    


    return (
        <div>
            <h2>{country.name.common}</h2>

            <p>Capital: {country.capital}</p>

            <p>Population: {country.population}</p>

            <h3>Languages:</h3>

            <ul>
                {Object.values(country.languages || {}).map(lang => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>

            <img 
                src={country.flags.png} 
                alt={`Flag of ${country.name.common}`} 
                width="200"
            />

            {weather && (
                <div>
                    <h3>Weather in {country.capital}</h3>
                    <p>Temperature: {weather.main.temp} °C</p>
                    <img 
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        width="200"
                    />
                    <p>Wind: {weather.wind.speed} m/s</p>
                    
                </div>
            )}
        </div>
    )
}

export default Country