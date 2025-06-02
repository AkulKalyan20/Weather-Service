import React, { useState } from 'react';
import WeatherChart from './components/WeatherChart';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const weather = await getWeather(city);
      const historical = await getHistoricalWeather(city);
      
      setWeatherData(weather);
      setHistoricalData(historical);
      setError('');
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <div className="weather-app">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {weatherData && (
        <div className="weather-info">
          <h2>Current Weather in {weatherData.name}</h2>
          <div className="current-weather">
            <div className="temperature">
              <h3>Temperature</h3>
              <p>{weatherData.main.temp}°C</p>
            </div>
            <div className="humidity">
              <h3>Humidity</h3>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div className="description">
              <h3>Description</h3>
              <p>{weatherData.weather[0].description}</p>
            </div>
          </div>

          {historicalData && (
            <WeatherChart
              temperatureData={historicalData}
              humidityData={historicalData}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
