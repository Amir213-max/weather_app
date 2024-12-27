"use client";
import React, { useState } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";

export default function Weather() {
  const [data, setData] = useState();
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [showWeather, setShowWeather] = useState(false);

  // قائمة المدن للاقتراحات
  const cities = [
    "London",
    "New York",
    "Paris",
    "Tokyo",
    "Cairo",
    "Dubai",
    "Sydney",
    "Berlin",
    "Moscow",
    "Rome",
    "Los Angeles",
    "San Francisco",
    "Barcelona",
    "Madrid",
    "Berlin",
    "Dubai",
    "Beijing",
    "Shanghai",
    "Seoul",
    "Singapore",
    "Hong Kong",
    "Istanbul",
    "Athens",
    "Bangkok",
    "Mexico City",
    "Lagos",
    "Toronto",
    "Vancouver",
    "Lagos",
    "Buenos Aires",
    "Rio de Janeiro",
    "Cape Town",
    "Toronto",
    "Chicago",
    "Boston",
    "Amsterdam",
    "Lisbon",
    "Stockholm",
    "Vienna",
    "Copenhagen",
    "Helsinki",
    "Zurich",
    "Warsaw",
    "Stockholm",
    "Oslo",
    "Mumbai",
    "Kuala Lumpur",
    "Jakarta",
    "Manila",
    "Lagos",
    "Dubai",
    "Sao Paulo"
  ];
  

  const [suggestions, setSuggestions] = useState([]);

  const getWeather = async () => {
    setLoading(true);
    setShowWeather(false);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=eb4ea75a1607141335e2409d1cfdac70`
      )
      .then((res) => {
        setData(res.data.main);
        setWeatherCondition(res.data.weather[0].main); // جلب حالة الطقس
        setLoading(false);
        setShowWeather(true);
      })
      .catch(() => {
        setLoading(false);
        setShowWeather(false);
      });
  };

  // تحديد الخلفية بناءً على حالة الطقس
  const getBackgroundStyle = () => {
    switch (weatherCondition.toLowerCase()) {
      case "clear":
        return { backgroundImage: "url('/sunny.jpeg')" };
        case "mist":
          return { backgroundImage: "url('/mist.jpeg')" };
        case "fog":
          return { backgroundImage: "url('/foggy Forest iPhone Phone Backround.jpeg')" };
      case "clouds":
        return { backgroundImage: "url('/Cloudy sky.jpeg')" };
      case "rain":
        return { backgroundImage: "url('/rainy.jpeg')" };
      case "snow":
        return { backgroundImage: "url('/snowy.jpeg')" };
      default:
        return { backgroundImage: "url('/icon.jpeg')" };
    }
  };

  // دوال Autosuggest
  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const filteredSuggestions =
      inputLength === 0
        ? []
        : cities.filter(
            (city) => city.toLowerCase().slice(0, inputLength) === inputValue
          );

    setSuggestions(filteredSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div className="px-4 py-2 hover:bg-purple-200">{suggestion}</div>
  );

  return (
    <div
      style={{
        ...getBackgroundStyle(),
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        transition: "background 1s ease-in-out", // تغيير الخلفية بسلاسة
      }}
      className="flex items-center justify-center text-teal-50"
    >
      <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>
        <div className="flex flex-col space-y-4">
          {/* Autosuggest */}
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: "Enter the city name",
              value: cityName,
              onChange: (_, { newValue }) => setCityName(newValue),
              className:
                "w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black",
            }}
          />
          <button
            onClick={getWeather}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-800 text-white font-semibold rounded-lg transition duration-300"
          >
            Get Weather
          </button>
        </div>
        {loading && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold animate-pulse">Loading...</h2>
          </div>
        )}
        {showWeather && data && (
          <div
            className={`mt-6 p-4 bg-white/20 rounded-lg shadow-md transform transition-all duration-700 ${
              showWeather ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <h2 className="text-xl font-bold text-center mb-4">Weather Data</h2>
            <p className="text-lg">🌡️ Temperature: {data.temp}°C</p>
            <p className="text-lg">💧 Humidity: {data.humidity}%</p>
            <p className="text-lg">🌪️ Pressure: {data.pressure} hPa</p>
            <p className="text-lg">🌤️ Condition: {weatherCondition}</p>
          </div>
        )}
      </div>
    </div>
  );
}
