/** Libraries */
import React, { Component } from 'react';
import { Container , Row, Col } from 'reactstrap';

/** Components */
import BaseMap from './components/Maps/BaseMap'
import apiCountries from './Helpers/ApiCountries'

class App extends Component {
  constructor() {
    super()
        this.state = {
        countries: [],
        actualCountry : [],
        flag : [],
        players : [
                   { id:1 , name: '' , points: 0 },
                   { id:2 , name: '' , points: 0 }
                  ]
    }
}
  
retrieveCountries(){  
  apiCountries.searchAllCountries()
  .then( ( countries ) => this.setState( { countries : countries.filter((country) => country.name === 'Spain')}))
  
}
componentWillMount(){
  this.retrieveCountries()
}

  render() {
    return (
      <Container fluid={true}>
      <BaseMap countries={this.state.countries} />
      <Row>
        <Col>
          
          <div className="frontGround"> 
          </div>
        </Col>
      </Row>  
      </Container>  
    )
  }
}

export default App