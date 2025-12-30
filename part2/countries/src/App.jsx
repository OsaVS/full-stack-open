import React from 'react'
import { useState, useEffect } from 'react'
import countryService from './services/countryService'

const App = () => {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleNameChange = (event) => {
    setNameFilter(event.target.value)
  }

  const filteredCountries = nameFilter === '' 
    ? null 
    : countries.filter(country => 
      country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
  )

  return(
    <div>
      <div>
        Find countries:
        <input 
          value={nameFilter}
          onChange={handleNameChange}
        />
      </div>
      <div>
        {filteredCountries === null 
          ? null 
          : filteredCountries.length > 10
            ? 'Too many matches, specify another filter'
            : filteredCountries.length === 1
              ? (
                <div>
                  <h2>{filteredCountries[0].name.common}</h2>
                  <p>Capital: {filteredCountries[0].capital}</p>
                  <p>Population: {filteredCountries[0].population}</p>
                  <h3>Languages:</h3>
                  <ul>
                    {Object.values(filteredCountries[0].languages).map(language => (
                      <li key={language}>{language}</li>
                    ))}
                  </ul>
                  <img 
                    src={filteredCountries[0].flags.png} 
                    alt={`Flag of ${filteredCountries[0].name.common}`} 
                    width="200"
                  />
                </div>
              )
              : (
                  <div>
                    {filteredCountries.map(country => (
                      <div key={country.name.common}>
                        {country.name.common}
                      </div>
                    ))}
                  </div>
              )
        }
      </div>
    </div>
  )
}

export default App