import React, { useState, useEffect} from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  // const dispatch = useDispatch();
  // const currentCity = useSelector((state) => state.city.currentCity);

  const search = (city) => {
    axios.get(
      `${apiKeys.base}weather?q=${city != "[object Object]" ? city : query
      }&units=metric&APPID=${apiKeys.key}`
    )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search(props.weather.city);
  }, []);

  return (
    <div className="forecast w-full xl:w-2/5 float-left h-screen bg-opacity-10 bg-black border">
      <div className="forecast-icon flex items-center justify-center p-12 pb-8">
        <ReactAnimatedWeather
          icon={props.icon}
          color={props.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather ">
        <h3 className="text-3xl font-bold text-center text-black w-4/5 mx-auto mb-20">
          Weather today in {props.weather.city} is {props.weather.main}.
        </h3>
        <div className="search-box flex items-center justify-center mb-15 relative z-2">
          <input
            type="text"
            className="w-4/5 xl:w-3/5 search-bar bg-white border rounded-full text-black p-2 px-6 text-l focus:outline-none"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box bg-white rounded-full h-10 w-10 flex items-center justify-center p-2 ml-2 cursor-pointer active:bg-opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" onClick={search} height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
          </div>
        </div>
        <ul>
          {typeof weather.main != "undefined" ? (
            <div>
              <li className="cityHead flex items-center justify-center my-10 ">
                <p className="text-black text-4xl">
                  {weather.name}, {weather.sys.country}
                </p>
                <img alt="weather-icon"
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
                  }
                />
              </li>
              <div className="w-full flex items-center justify-center">
                <div className="w-4/5 mt-5 ml-12">
                  <li className="grid grid-cols-2 mb-5 text-xl">
                    Temperature{" "}
                    <span className="temp text-black text-center">
                      {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                    </span>
                  </li>
                  <li className="grid grid-cols-2 mb-5 text-xl">
                    Humidity{" "}
                    <span className="temp text-black text-center">
                      {Math.round(weather.main.humidity)}%
                    </span>
                  </li>
                  <li className="grid grid-cols-2 mb-5 text-xl">
                    Visibility{" "}
                    <span className="temp text-black text-center">
                      {Math.round(weather.visibility)} mi
                    </span>
                  </li>
                  <li className="grid grid-cols-2 mb-5 text-xl">
                    Wind Speed{" "}
                    <span className="temp text-black text-center">
                      {Math.round(weather.wind.speed)} Km/h
                    </span>
                  </li>
                </div>
              </div>
            </div>
          ) : (
            <li className="text-black text-xl text-center my-20 font-bold">
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Forcast;
