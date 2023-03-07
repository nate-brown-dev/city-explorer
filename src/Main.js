import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class Main extends React.Component {

  render() {

    return (
      <>
        <main>
          <h2>Main</h2>
          <div className="mainForm">
          <Form onSubmit={this.props.citySubmit}>
            <Form.Label>Pick a City
              <Form.Control type="text" onChange={this.props.handleCityInput} name="city"/>
            </Form.Label>
            <Button type="submit">Submit</Button>
          </Form>
          </div>
          <div className="results">
            {this.props.cityData}
          </div>
        </main>
      </>
    )

  }
}

export default Main;