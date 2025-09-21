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
      if (city === "") {
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

         console.log(data);

         const icon = allIcons[data.weather[0].icon] || clearicon;
         setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            description: data.weather[0].description,
            icon: icon
         })

      } catch (error) {
         setWeatherData(false);
         console.log("Error in fetching data");
      }
   }
   useEffect(() => {
      // don’t search on load
   }, []);

   return (
      <div className="weather">
         <div className="search-bar">
            <input ref={inputref} type="text" placeholder="Search" />
            <img src={searchicon} alt="" onClick={() => search(inputref.current.value)} />
         </div>

         {weatherData ? <>
            <img src={weatherData.icon} alt="" className="weathericon" />
            <p className="temperature">{weatherData.temperature}°c</p>
            <p className="description">{weatherData.description}</p>
            <p className="location">
               <img src={locationicon} alt="location" className="location-icon" />
               {weatherData.location}
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
            </div>
         </> : <></>}


      </div>
   )
}

export default Weather;