/** Libraries */
import React, { Component } from 'react';
import { Container , Row, Col, Input } from 'reactstrap';

/** Components */
import BaseMap from './components/Maps/BaseMap'
import apiCountries from './Helpers/ApiCountries'

class App extends Component {
  constructor() {
    super()
        this.state = {
        value: '',
        countries: [],
        coords: [0,20],
        selectedCountry : ['ESP']
    }
   this.handleNewCoords = this.handleNewCoords.bind(this)
}


handleNewCoords(event){
  
  let country = this.state.countries.filter((country) => country.name === event.target.value )
  this.setState({
      selectedCountry : [country[0].alpha3Code],
      value : [ country[0].name ],
      coords : [ country[0]['latlng'][1], country[0]['latlng'][0]]
    }) 
}

retrieveCountries(){  
  apiCountries.searchAllCountries()
  .then( ( countries ) => this.setState( { countries : countries
    .filter((country) => country.capital !== '' )
    .map((country)=> country )
    .sort((a,b)=> a-b )
  })
  )
  
}
componentDidMount(){
  this.retrieveCountries()
}

  render() {
    return (
      <Container fluid={true}>
      <BaseMap newCoords={this.state.coords}
               selectedCountry={this.state.selectedCountry}/>
      <Row>
        <Col>
          <div className="frontGround">
            <Input type="select" onChange={this.handleNewCoords} value={this.state.value}>
              {
                this.state.countries.map((country,index)=> <option key={index} value={country.name}>{country.name}</option>)
              }
            </Input>
          </div>
        </Col>
      </Row>  
      </Container>  
    )
  }
}

export default App