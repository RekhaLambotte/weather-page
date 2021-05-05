
import './App.css';
import Weather from './component/weather.component';

import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import React from 'react';

const API_key = "345a624fa50a546bb02a37f8aed1fe1a";
// api call api.openweathermap.org/data/2.5/weather?q=London&appid={API key}

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      city: undefined,
      counstry: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      desciption: "",
      error: false
    };

    this.getWeather();

    this.weatherIcon = {
      Thunderstorm:"wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere:"wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  

  calculCelcius(tempInit){
    let cell = Math.floor(tempInit - 273.15);
    return cell
  }

  get_WeatherIcon(icons,rangeId){
    switch(true){
      case rangeId >= 200 && rangeId >= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId >= 332:
        this.setState({icon: this.weatherIcon.Drizzle});
        break;
      case rangeId >= 500 && rangeId >= 532:
        this.setState({icon: this.weatherIcon.Rain});
        break;
      case rangeId >= 600 && rangeId >= 622:
        this.setState({icon: this.weatherIcon.Snow});
        break;
      case rangeId >= 700 && rangeId >= 782:
        this.setState({icon: this.weatherIcon.Atmosphere});
        break;
      case rangeId === 800:
        this.setState({icon: this.weatherIcon.Clear});
        break;
      case rangeId >= 801 && rangeId >= 804:
        this.setState({icon: this.weatherIcon.Clouds});
        break;
      default:
        this.setState({icon: this.weatherIcon.Clouds})
    
    }
  }

  getWeather = async()=> {
    const api_call= await fetch (`http://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_key}`);
    
    const response = await api_call.json();

    console.log(response);

    this.setState({
      city: response.name,
      counstry: response.sys.country,
      celsius: this.calculCelcius(response.main.temp),
      temp_max: this.calculCelcius(response.main.temp_max),
      temp_min: this.calculCelcius(response.main.temp_min),
      desciption: response.weather[0].description,
      //icon: this.weatherIcon.Thunderstorm
      
    })
    
    this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);

  }

  render(){
    return (
      <div className="App">
      
      <Weather 
        city={this.state.city} 
        country = {this.state.counstry}
        temp_celsius = {this.state.celsius}
        temp_max = {this.state.temp_max}
        temp_min = {this.state.temp_min}
        desciption = {this.state.desciption}
        weatherIcon = {this.state.icon}
        
      />
    </div>
    )
  }

}


export default App;

