const Country = ({ country }) => {
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
        </div>
    )
}

export default Country