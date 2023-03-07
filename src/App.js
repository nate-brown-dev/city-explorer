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
      cityData: {},
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
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}=${this.state.cityName}&format=json`);
    
    // let cityData = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`);

    
    console.log(cityData.data[0]);
  }

  render() {
    return (
      <>
        <Header/>
        {/* <Main/> */}
        <>
        <main>
          <h2>Main</h2>
          <div className="mainForm">
          <Form onSubmit={this.citySubmit}>
            <Form.Label>Pick a City
              <Form.Control type="text" onChange={this.handleCityInput}/>
            </Form.Label>
            <Button type="submit">Get City Data</Button>
          </Form>
          </div>
          <div className="results">
            {this.props.cityData}
          </div>
        </main>
      </>

        <Footer/>
      </>
    )
  }
}

export default App;
