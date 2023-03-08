import React from 'react';
import Header from './Header';
// import Main from './Main';
import Footer from './Footer';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: [],
      error: false,
      errorMessage: ''
    }
  }


  handleCityInput = (event) => {
    this.setState({
      cityName: event.target.value
    });
  }

  citySubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.cityName);
    let cityResults = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`);

    this.setState({
      cityData: cityResults.data
    });

    console.log(this.state.cityData);
    console.log(cityResults.data[0]);
  }

  render() {

    let cityNamesList = this.state.cityData.map((cityData, index) => {
      return <li key={index}>{cityData.display_name}</li>
    })

    let cityLatList = this.state.cityData.map((cityData, index) => {
      return <li key={index}>{cityData.lat}</li>
    })

    let cityLonList = this.state.cityData.map((cityData, index) => {
      return <li key={index}>{cityData.lon}</li>
    })

    // let mapURL = ''


    console.log(this.state.cityData);

    return (
      <>
        <Header/>
        {/* <Main/> */}
        <>
        <main className="mainClass">
          <div>
          <h2>Enter a Place in the Form</h2>
          <div className="mainForm">
          <Form onSubmit={this.citySubmit}>
            <Form.Label>Pick a City
              <Form.Control type="text" onChange={this.handleCityInput}/>
            </Form.Label>
            <Button type="submit">Explore!</Button>
          </Form>
          </div>
          </div>
          <div className="results">
            <p>{cityNamesList[0]}</p>
            <p>{cityLatList[0]}</p>
            <p>{cityLonList[0]}</p>
          </div>
        </main>
      </>

        <Footer/>
      </>
    )
  }
}

export default App;
