import React, { useState } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=180b60933ff059f5088fe4b4a55c12fb&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Weather App</h1>
        <input
          type="text"
          className="border p-2 mb-4 w-full"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather} className="bg-blue-500 text-white px-4 py-2 rounded">
          Get Weather
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {weather && weather.weather && weather.weather.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p className="text-2xl">{weather.main.temp}°C</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
