import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [country, setCountry] = useState('')
  const [countriesData, setCountriesData] = useState([])
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState()
  const apiKey = process.env.REACT_APP_API_KEY
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`


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

  useEffect(() => {
    if (countriesData.length === 1) {
      setCity(countriesData[0].capital[0])
    }
    if (city) {
      axios.get(apiUrl).then(res => setWeather(res.data))
        .catch(err => console.log(err))
    }
  }, [city, apiUrl, countriesData])

  const handleShow = (name) => {
    setCountriesData(countriesData.filter(country => country.name.common === name))
  }

  return (
    <div>
      <label>find countries  <input value={country} onChange={handleChange} /></label>
      {countriesData.length > 10 && <p>Too many matches, specify another filter</p>}
      {countriesData.length > 1 && countriesData.length <= 10 && countriesData.map(country => (
        <div key={country.name.common}>
          <p>{country.name.common}</p><button onClick={() => handleShow(country.name.common)}>show</button>
        </div>
      ))}
      {countriesData.length === 1 &&
        <div>
          <h1>{countriesData[0].name.common}</h1>
          <h3>Capital: {city}</h3>
          <h3>Area: {countriesData[0].area}</h3>
          <h3>Languages:</h3>
          <ul>
            {Object.values(countriesData[0].languages).map(lang => <li key={lang}>{lang}</li>)}
          </ul>
          <img alt={Object.values(countriesData[0].flags)[2]} src={Object.values(countriesData[0].flags)[0]} />


          {weather && <div>
            <h3>Weather in {city}</h3>
            <p>Current temperature: {weather.main.temp} °C</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`weather in ${city}`} />
            <p>Wind: {weather.wind.speed} km/h</p></div>}
        </div>
      }
    </div>
  );
}

export default App;
