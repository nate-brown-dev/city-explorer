import React from 'react';
import Header from './Header';
// import Main from './Main';
import Footer from './Footer';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
// import Weather from './Weather';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',           /* form input                           empty until submit                                  */
      hasCityData: false,     /* flag for entered city coordinates    false until LocationIQ API call response received   */
      cityData: [],           /* results from LocationIQ API call     empty until response received                       */
      error: false,           /* error flag                           false unless LocationIQ API call fails              */
      errorMessage: '',       /* text to show in case of error        empty unless error flag is true                     */
      hasMapURL: false,       /* map flag                             false until LocationIQ API call response received   */
      mapURL: '',             /* query string to get map image        empty until LocationIQ API call response received   */
      hasWeatherData: false,
      weatherData: [],
      cityLatLong: []
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
    let cityResults;
    try {
      cityResults = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`);
    // put query results into cityData in state 
      this.setState({
        error: false,
        hasCityData: true,
        cityData: cityResults.data
      },
      this.getMap
      );
    } catch (e) {
      this.setState({
        error: true,
        errorMessage: `An error occurred: Type ${e.response.status}, ${e.response.data.error}. Please try again.`
      });
    }
  }

  // function to get map from LocationIQ static map
  // request format: GET https://maps.locationiq.com/v3/staticmap?key=<YOUR_ACCESS_TOKEN>&center=17.450419,78.381149&size=600x600&zoom=14
  getMap = async () => {
    // local variable for map request
    let u;
    try {
      u = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData[0].lat},${this.state.cityData[0].lon}&size=500x500&zoom=12`);
      this.setState({
        hasMapURL: true,
        mapURL: u.config.url
      },
        this.getForecast
      );
    } catch (e) {
      // console.log(u);
      this.setState({
        error: true,
        errorMessage: `An error occurred: Type ${e.response.status}, ${e.response.data.error}. Unable to process your request.`
      },
        // console.log(this.state.error),
        // console.log(this.state.errorMessage)
      );
    }
  }

  // function to get weather forecast from Weatherbit API via express server   
  // request format: http://localhost:3001/city?lat=$LAT&lon=$LON
  getForecast = async () => {
    // local variable for weather request
    let v;
    try {
      v = await axios.get(`${process.env.REACT_APP_SERVER}city?lat=${this.state.cityData[0].lat}&lon=${this.state.cityData[0].lon}`);
      this.setState({
        hasWeatherData: true,
        weatherData: v.data
      });
    } catch (e) {
      this.setState({
        error: true,
        errorMessage: `An error occurred: Type ${e.response.status}, ${e.response.data.error}. Unable to process your request.`
      },
        console.log(this.state.error),
        console.log(this.state.errorMessage)
      );
    }
  }

  render() {

    let cityNamesList = this.state.cityData.map((cityData, index) => {
      return <li key={index}>{cityData.display_name}: Latitude {cityData.lat}, Longitude {cityData.lon}</li>
    })

    let cityForecast = this.state.weatherData.map((weatherData, index) => {
      return <li key={index}>On {weatherData.date} there will be {weatherData.description}.</li>
    })

    // let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData[0].lat},${this.state.cityData[0].lon}&size=500x500&zoom=10`
    let mapAlt = this.state.cityName;

    return (
      <>
        <Header />
        <>
          <main className="mainClass">
            <div className="mainDiv">
              <h2>Enter a Place in the Form</h2>
              <div>
                <Form onSubmit={this.handleCitySubmit}>
                  <Form.Label>Pick a City
                    <Form.Control type="text" onChange={this.handleCityInput} />
                  </Form.Label>
                  <Button type="submit">Explore!</Button>
                </Form>
              </div>
            </div>
            <>
              { this.state.error
                &&
                <Card className="cardClass">
                  <Card.Title>
                    <h3>Oh no!</h3>
                  </Card.Title>
                  <Card.Body>
                    {this.state.errorMessage}
                  </Card.Body>
                </Card>
              }
              {
                this.state.hasCityData
                &&
                <Card className="cardClass">
                  <Card.Title>
                    <h3>You selected</h3>
                  </Card.Title>
                  <Card.Body>
                    {cityNamesList[0]}
                </Card.Body>
              </Card>
              }
              {
                this.state.hasMapURL
                &&
                <Card className="cardClass">
                  <Card.Title>
                    <h3>Map of Selected City</h3>
                  </Card.Title>
                  <Card.Body>
                    <img src={this.state.mapURL} alt={mapAlt}></img>
                  </Card.Body>
                </Card>
              }
              {
                this.state.hasWeatherData
                &&
                <Card className='cardClass'>
                  <Card.Title>
                    <h3>7-Day Weather Forecast</h3>
                  </Card.Title>
                  <Card.Body>
                    {cityForecast}
                  </Card.Body>
                </Card>
              }
            </>
          </main>
        </>
        <Footer />
    </>
    )
  }
}

export default App;
