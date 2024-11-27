import React from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};


class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
    color: undefined,
    img: undefined,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          this.getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKeys.key}`
    );
    const data = await api_call.json();
    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,
    });
    switch (this.state.main) {
      case "Haze":
        this.setState({ icon: "FOG", color: "Gray", img: "bg-[url(./images/foggy.jpg)]" });
        break;
      case "Clouds":
        this.setState({ icon: "CLOUDY", color: "Grey", img: "bg-[url(./images/sunny.jpg)]" });
        break;
      case "Rain":
        this.setState({ icon: "RAIN", color: "Grey", img: "bg-[url(./images/rainy.jpg)]" });
        break;
      case "Snow":
        this.setState({ icon: "SNOW", color: "Grey", img: "bg-[url(./images/snowy.jpg)]" });
        break;
      case "Dust":
        this.setState({ icon: "WIND", color: "Brown", img: "bg-[url(./images/windy.jpg)]" });
        break;
      case "Drizzle":
        this.setState({ icon: "SLEET", color: "Yellow", img: "bg-[url(./images/rainy.jpg)]" });
        break;
      case "Fog":
        this.setState({ icon: "FOG", color: "Grey", img: "bg-[url(./images/foggy.jpg)]" });
        break;
      case "Smoke":
        this.setState({ icon: "FOG", color: "Grey", img: "bg-[url(./images/foggy.jpg)]" });
        break;
      case "Tornado":
        this.setState({ icon: "WIND", color: "Grey", img: "bg-[url(./images/windy.jpg)]" });
        break;
      default:
        this.setState({ icon: "CLEAR_DAY", color: "Orange", img: "bg-[url(./images/sunny.jpg)]" });
    }
  };

  render(){
    if (this.state.temperatureC) {
      return (
        <React.Fragment>
          <div className={`w-full rounded-r-none xl:w-3/5 h-screen float-left relative min-h-[500px] justify-end bg-black ${this.state.img} bg-cover`}>
            <div className="h-1/4 xl:date-time text-white w-full p-0 pl-12 xl:h-4/5 font-oxygen ">
              <div className="dmy float-left text-left text-2xl">
                <div className="current-time mt-12">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="w-full pt-12 xl:temperature xl:w-1/2 float-right xl:pt-12">
                <p className="text-6xl xl:font-raleway xl:text-7xl font-bold m-0">
                  {this.state.temperatureC}&deg;C / {this.state.temperatureF} &deg;F
                </p>
              </div>              
            </div>
            <div className="text-white xl:hidden h-2/4 w-full font-oxygen text-5xl font-bold pt-16 pl-12">
              {this.state.main}
            </div>
            <div className="w-full h-1/5 font-oxygen pt-5 pl-12">
              <h2 className="text-6xl text-white xl:text-5xl font-bold">{this.state.city}</h2>
              <h3 className="text-4xl xl:text-2xl font-bold text-white">{this.state.country}</h3>
            </div>
          </div>


          <Forcast icon={this.state.icon} color={this.state.color} weather={this.state} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="w-full h-screen flex items-center justify-center bg-sky-200">
            <img src={loader} alt="loader" style={{ width: "50%", WebkitUserDrag: "none" }} />
            <h3 className="text-black text-lg font-bold">
              Detecting your location
            </h3>
            <h3 className="text-black font-semibold">
              Your current location wil be displayed on the App <br></br> & used
              for calculating Real time weather.
            </h3>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Weather;
