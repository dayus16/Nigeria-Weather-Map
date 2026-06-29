import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import nigeriaCities from "../src/data/nigeriaCities";

import { WiHumidity } from "react-icons/wi";
import { FaCloudRain, FaSearch, FaWind } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";
import { SiEspressif } from "react-icons/si";

const WeatherMap = () => {
  const [weather, setWeather] = useState(null);
  const [selectedStates, setSelectedStates] = useState(null);
  const [forecast, setForcast] = useState(null);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async (city) => {
    setSelectedStates(city);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates[0]}&lon=${city.coordinates[1]}&appid=${apiKey}&units=metric`,
      );
      const data = await res.json();
      console.log("weather Data", data);
      setWeather(data);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.coordinates[0]}&lon=${city.coordinates[1]}&appid=${apiKey}&units=metric`,
      );
      const forecastData = await forecastRes.json();
      console.log("ForcasteData:", forecastData);
      const dailyForecast = forecastData.list.filter(
        (item) => item.dt_txt.includes("12:00:00"), // only keep the 12pm entry for each day
      );
      setForcast(dailyForecast);

      //   console.log("Weather data:", data);
    } catch (err) {
      console.error("Error fatching Weaher Data:", err);
    }
  };

  return (
    <div className="">
      <header className="bg-[#1a3a5e] p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#5a718b] p-4 rounded-lg">
              <FaCloudRain size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold">NigeriaWeather</h1>
              <small className="text-gray-300">
                Live weather accross Nigeria
              </small>
            </div>
          </div>
          <div className="relative w-[60%]">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search cities..."
              className="w-full py-2 px-4 pl-10 rounded-lg border border-gray-500 bg-[#314e6e]"
            />
          </div>
          <div className="flex items-center">
            <div className="bg-[#a8b4c1] py-1 px-2 rounded">
              <p>°C</p>
            </div>
            <div className="bg-[#314e6e] py-1 px-2 rounded">
              <p>°F</p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        <div className="w-[70%]">
          <MapContainer
            center={[9.082, 8.6753]}
            zoom={6}
            scrollWheelZoom={false}
            className="w-full h-screen"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {nigeriaCities.map((city) => (
              <Marker
                position={city.coordinates}
                eventHandlers={{
                  click: () => {
                    fetchWeather(city);
                  },
                }}
                key={city.name}
              >
                <Popup>{city.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="w-[30%] overflow-y-auto">
          {weather ? (
            <div className="p-4">
              <h1 className="text-xl text-gray-200 font-semibold">
                {selectedStates.name}
              </h1>
              <small className="text-gray-400">{selectedStates.zone}</small>
              <div className="border-t border-gray-600 mt-2 flex items-center justify-between">
                <div className="mt-3">
                  <h1 className="text-5xl font-bold text-gray-200">
                    {Math.round(weather.main.temp)}°C
                  </h1>

                  <small className="text-gray-400 capitalize">
                    {weather.weather[0].description}
                  </small>

                  <p className="text-gray-500 text-xs mt-1">
                    Feels like {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-16 h-16"
                />
              </div>
              <div className="border-t border-gray-600 mt-2 grid grid-cols-2">
                <div className="mt-3">
                  <div className="flex items-center gap-1">
                    <WiHumidity />
                    <small className="text-gray-400">Humidity</small>
                  </div>
                  <h3 className="text-xl text-gray-200 font-semibold">
                    {weather.main.humidity} %
                  </h3>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-1">
                    <FaWind />
                    <small className="text-gray-400">Wind</small>
                  </div>
                  <h3 className="text-xl text-gray-200 font-semibold">
                    {weather.wind.speed} km/h
                  </h3>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-1">
                    <MdOutlineVisibility />
                    <small className="text-gray-400">Visibility</small>
                  </div>
                  <h3 className="text-xl text-gray-200 font-semibold">
                    {weather.visibility / 1000} km
                  </h3>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-1">
                    <SiEspressif />
                    <small className="text-gray-400">Pressure</small>
                  </div>
                  <h3 className="text-xl text-gray-200 font-semibold">
                    {weather.main.pressure} hPa
                  </h3>
                </div>
              </div>
              {/* 5 day forecast section */}
              {forecast && (
                <div className="mt-4 border-t border-gray-600 pt-3">
                  <h3 className="text-gray-400 text-xs font-semibold uppercase mb-3">
                    5 Day Forecast
                  </h3>

                  {forecast.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-700"
                    >
                      {/* day name — converts date to Mon, Tue etc */}
                      <span className="text-gray-400 text-sm w-10">
                        {index === 0
                          ? "Today"
                          : new Date(day.dt_txt).toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                      </span>

                      {/* weather icon for that day */}
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                        alt={day.weather[0].description}
                        className="w-8 h-8"
                      />

                      {/* high and low temperature */}
                      <span className="text-white text-sm font-semibold">
                        {Math.round(day.main.temp_max)}°
                        <span className="text-gray-500 font-normal ml-1">
                          {Math.round(day.main.temp_min)}°
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[80%]">
              <p className="text-gray-400 text-xl font-bold ">
                Click any city marker to see its weather
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
