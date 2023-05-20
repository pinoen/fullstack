import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [country, setCountry] = useState('')
  const [countriesData, setCountriesData] = useState([])

  const handleChange = (e) => {
    setCountry(e.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => {
        const data = res.data.filter(item => item.name.common.toLowerCase().includes(country.toLocaleLowerCase()))
        setCountriesData(data)
      })
  }, [country])

  return (
    <div>
      <label>find countries  <input value={country} onChange={handleChange} /></label>
      {countriesData.length > 10 && <p>Too many matches, specify another filter</p>}
      {countriesData.length > 1 && countriesData.length <= 10 && countriesData.map(country => <p key={country.name.common}>{country.name.common}</p>)}
      {countriesData.length === 1 &&
        <div>
          <h1>{countriesData[0].name.common}</h1>
          <h3>Capital: {countriesData[0].capital[0]}</h3>
          <h3>Area: {countriesData[0].area}</h3>
          <h3>Languages:</h3>
          <ul>
            {Object.values(countriesData[0].languages).map(lang => <li>{lang}</li>)}
          </ul>
          <img alt={Object.values(countriesData[0].flags)[2]} src={Object.values(countriesData[0].flags)[0]} />
        </div>
      }
    </div>
  );
}

export default App;
