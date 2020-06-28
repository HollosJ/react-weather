import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import arrow from "./img/arrow.png";

const api = {
  key: "5533da5ce45826db457ab797b0ceded4",
  base: "https://api.openweathermap.org/data/2.5/weather?",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [night, setNight] = useState(false);

  const search = (e) => {
    if (e.key === "Enter") {
      axios
        .get(`${api.base}q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => {
          let result = res.data;
          setWeather({});
          setWeather(result);

          //background gradient logic
          if (
            result.dt < result.sys.sunrise &&
            result.dt > result.sys.sunset - 87400 * 1000
          ) {
            setNight(true);
          } else {
            setNight(false);
          }
        });
    }
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div
      className={`App ${night ? "night" : "day"}`}
      style={{
        //background logic
        background: `${
          night
            ? `linear-gradient(
        0deg,
        rgba(23, 0, 38, 1) 0%,
        rgba(73, 0, 65, 1) 100%
      )`
            : `linear-gradient(
        0deg,
        rgba(0, 255, 252, 1) 0%,
        rgba(0, 112, 255, 1) 100%
      )`
        }`,
      }}
    >
      <div className="search-container">
        <input
          className="search"
          type="text"
          placeholder="Search..."
          onKeyPress={search}
          onChange={handleInput}
        />
      </div>
      {typeof weather.main !== "undefined" ? (
        <div className="weather-container">
          <h1 className="name">{`${weather.name}, ${weather.sys.country}`}</h1>
          <p className="temp">{`${Math.round(weather.main.temp)}°c`}</p>
          <div className="condition">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <span className="condition-main">{weather.weather[0].main}</span>
            <span className="condition-description">
              {weather.weather[0].description}
            </span>
          </div>
          <div className="wind">
            <img
              className="wind-direction"
              src={arrow}
              alt=""
              style={{ transform: `rotate(${180 + weather.wind.deg}deg)` }}
            />
            <span className="wind-speed">{`${weather.wind.speed}m/s`}</span>
          </div>
        </div>
      ) : (
        <h1 className="welcome-msg">Search a location above...</h1>
      )}
    </div>
  );
}

export default App;
