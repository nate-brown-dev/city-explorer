import React from 'react';
import axios from 'axios';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: ''
    }
  }

  // handleWeatherSubmit = async (event) => {
  //   event.preventDefault();
  //   // // request format: http://localhost:3001/city?cityName=Seattle
  //   let weatherData = await axios.get(`${process.env.REACT_APP_SERVER}city?cityName=${this.props.state.cityName}`);
  //   this.setState({
  //     weatherData: weatherData
  //   });
  //   console.log(weatherData);
  // }

  render() {
    return (
      <>
        <p>{this.state.weatherData}</p>
      </>
    )
  }
}

export default Weather;