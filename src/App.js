import React from 'react';
import Header from './Header';
// import Main from './Main';
import Footer from './Footer';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import Weather from './Weather';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',           /* form input                           empty until submit                                  */
      cityData: [],           /* results from LocationIQ API call     empty until response received                       */
      error: false,           /* error flag                           false unless LocationIQ API call fails              */
      errorMessage: '',       /* text to show in case of error        empty unless error flag is true                     */
      isMapDisplayed: false,  /* map flag                             false until LocationIQ API call response received   */
      mapURL: '',             /* query string to get map image        empty until LocationIQ API call response received   */
      weatherData: []
    }
  }

  // event handler for form submit, changes cityName in state
  handleCityInput = (event) => {
    this.setState({
      cityName: event.target.value
    });
  }

  // event handler for API call to LocationIQ, sends cityName from state
  handleCitySubmit = async (event) => {
    event.preventDefault();
    // API call to LocationIQ with name from form
    let cityResults = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`);
    // put query results into cityData in state 
    this.setState({
      cityData: cityResults.data
    });
    this.handleWeatherSubmit();
  }

  // weather submit function separated, called from city submit function
  handleWeatherSubmit = async (event) => {
    // request format: http://localhost:3001/city?cityName=Seattle

    let weatherResults = await axios.get(`${process.env.REACT_APP_SERVER}city?cityName=${this.state.cityName}`);
    // let weatherResults = await axios.get(`https://api.weatherbit.io/v2.0/current?&city=${this.state.cityName}&key=KEY&include=minutely`);
    console.log(weatherResults);
    // weatherbit request format: https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely
    this.setState({
      weatherData: weatherResults.data
    });
    console.log(this.state.weatherData);
  }

  render() {

    let cityNamesList = this.state.cityData.map((cityData, index) => {
      return <li key={index}>{cityData.display_name}: Latitude {cityData.lat}, Longitude {cityData.lon}</li>
    })

    let cityForecast = this.state.weatherData.map((weatherData, index) => {
      return <li key={index}>On {weatherData.date} there will be {weatherData.description}.</li>
    })
    
    // let mapURL = this.state.mapURL;

    return (
      <>
        <Header/>
        {/* <Main/> */}
        <>
        <main className="mainClass">
          <div className="mainDiv">
          <h2>Enter a Place in the Form</h2>
          <div>
          <Form onSubmit={this.handleCitySubmit}>
            <Form.Label>Pick a City
              <Form.Control type="text" onChange={this.handleCityInput}/>
            </Form.Label>
            <Button type="submit">Explore!</Button>
          </Form>
          </div>
          </div>
          <div className="mainDiv">
            <p>{cityNamesList[0]}</p>
            {/* <img src={mapURL} alt='map of selected city' /> */}
            <Weather/>
          </div>
          <div className="mainDiv">
            <ul>
              {cityForecast}
            </ul>
          </div>
        </main>
      </>
        <Footer/>
      </>
    )
  }
}

export default App;
