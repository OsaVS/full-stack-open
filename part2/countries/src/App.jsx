import React from 'react'
import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import Country from './components/country'

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
                  <Country country={filteredCountries[0]} />
              )
              : (
                  <div>
                    {filteredCountries.map(country => (
                      <div key={country.name.common}>
                        {country.name.common} <button onClick={() => setNameFilter(country.name.common)}>show</button>
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