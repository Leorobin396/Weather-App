import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('Bengaluru');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b922ba6bd6f7156307096a0fb98f863f`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      }).catch((error) => {
        console.error("There was an error with the API request:", error);
      });
    }
  };

  const kelvinToCelsius = (temp) => {
    return (temp - 273.15).toFixed(2);
  };

  return (
    <div className="app">
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter city'
          type='text'
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{kelvinToCelsius(data.main.temp)}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
      </div>

      {data.name && (
        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className='bold'>{kelvinToCelsius(data.main.feels_like)}°C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p>{data.wind.speed} M/S</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
