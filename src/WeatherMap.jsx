import React from "react";
import { FaCloudRain, FaSearch } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WeatherMap = () => {
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
      <div className="w-[70%]">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-screen"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="w-[30%]"></div>
    </div>
  );
};

export default WeatherMap;
