import './App.css';
import React, { useState } from 'react';
import SearchBar from './components/searchBar';
import WeatherCard from './components/weatherCard';
import ErrorMessage from './components/errorMessage';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = "ecd7799fbf9b4036b3172426253007"; //weather API key

const fetchWeather = async () => {
  if (!city) {
    setError('Please enter a city name');
    return;
  }
    try{
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);

      if (!response.ok) {
        setError('City not found');
        setWeather(null);
        return;
      }


      const data = await response.json();
      setWeather(data);
      setError(''); //remove previous error

    }catch (error){
      console.error("Error fetching weather:", error); // for the developer
      alert("Something went wrong. Please try again.") // for the user
      setWeather(null);
    }
  };

  return(
      <div className="App">
      <h1>Weather App</h1>
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard weather={weather} />}
      </div>
    );
  };
  

export default App
