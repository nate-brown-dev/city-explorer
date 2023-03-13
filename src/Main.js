import React from 'react';
import './Main.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

class Main extends React.Component {

  render() {

    return (
      <>
          <main className="mainClass">
            <div className="mainDiv">
              <h2>Enter a Place in the Form</h2>
              <div>
                <Form onSubmit={this.props.handleCitySubmit}>
                  <Form.Label>Pick a City
                    <Form.Control type="text" onChange={this.props.handleCityInput} />
                  </Form.Label>
                  <Button type="submit">Explore!</Button>
                </Form>
              </div>
            </div>
            <div className="mainDiv">
              <Card id="cityResultsCard" className="resultsCardClass">
                {/* {cityNamesList[0]} */}
              </Card>
              <Card id="cityMapCard" className="resultsCardClass">
                {/* <img src={mapURL} alt='map of selected city' /> */}
                {/* <Weather/> */}
              </Card>
              <Card id="cityWeatherCard" className="resultsCardClass">
                {/* {cityForecast} */}
              </Card>
            </div>
            <div className="mainDiv">
              <ul>
              </ul>
            </div>
          </main>
      </>
    );

  }
}

export default Main;