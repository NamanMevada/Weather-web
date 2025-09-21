import React, { useEffect, useState, useRef } from "react";
import './Weather.css';
import searchicon from '../assets/search2.png';
import clearicon from '../assets/clear.png';
import cloudicon from '../assets/cloud.png';
import drizzleicon from '../assets/drizzle.png';
import rainicon from '../assets/rain.png';
import snowicon from '../assets/snow.png';
import locationicon from '../assets/location.png';
import windicon from '../assets/wind.png';
import humidityicon from '../assets/humidity.png';
import sunriseicon from '../assets/sunrise.png'; 
import sunseticon from '../assets/sunset.png'; 

const Weather = () => {
   const inputref = useRef();
   const [weatherData, setWeatherData] = useState(false);

   const allIcons = {
      "01d": clearicon,
      "01n": clearicon,
      "02d": cloudicon,
      "02n": cloudicon,
      "03d": cloudicon,
      "03n": cloudicon,
      "04d": drizzleicon,
      "04n": drizzleicon,
      "09d": rainicon,
      "09n": rainicon,
      "10d": rainicon,
      "10n": rainicon,
      "13d": snowicon,
      "13n": snowicon,
   }

   const search = async (city) => {
      if (!city) {
         alert("Please enter a city name");
         return;
      }
      try {
         const url =  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
         const response = await fetch(url);
         const data = await response.json();

         if (!response.ok) {
            alert(data.message);
            return;
         }

         const icon = allIcons[data.weather[0].icon] || clearicon;

         // Convert sunrise & sunset timestamps to readable time
         const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
         const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

         setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            country: data.sys.country,
            description: data.weather[0].description,
            icon: icon,
            sunrise: sunriseTime,
            sunset: sunsetTime
         });

      } catch (error) {
         setWeatherData(false);
         console.log("Error in fetching data", error);
      }
   }

   return (
      <div className="weather">
         <div className="search-bar">
            <input ref={inputref} type="text" placeholder="Search" onKeyDown={(e)=> e.key==="Enter" && search(inputref.current.value)} />
            <img src={searchicon} alt="search" onClick={() => search(inputref.current.value)} />
         </div>

         {weatherData && <>
            <img src={weatherData.icon} alt="weather" className="weathericon" />
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="description">{weatherData.description}</p>
            <p className="location">
               <img src={locationicon} alt="location" className="location-icon" />
               {weatherData.location}, {weatherData.country}
            </p>

            <div className="weather-data">
               <div className="col">
                  <img src={humidityicon} alt="humidity" />
                  <div>
                     <p>{weatherData.humidity} %</p>
                     <span>Humidity</span>
                  </div>
               </div>

               <div className="col">
                  <img src={windicon} alt="wind" />
                  <div>
                     <p>{weatherData.windSpeed} km/h</p>
                     <span>Wind Speed</span>
                  </div>
               </div>

               <div className="col">
                  <img src={sunriseicon} alt="sunrise" />
                  <div>
                     <p>{weatherData.sunrise}</p>
                     <span>Sunrise</span>
                  </div>
               </div>

               <div className="col">
                  <img src={sunseticon} alt="sunset" />
                  <div>
                     <p>{weatherData.sunset}</p>
                     <span>Sunset</span>
                  </div>
               </div>
            </div>
         </>}
      </div>
   )
}

export default Weather;
