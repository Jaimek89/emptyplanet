import React, { Component } from 'react';
import map from './map.png';
import logo from './logo.svg';
import player1 from './player1.svg';
import player2_ from './player2_.svg';
import people from './people.svg';
import planetHearth from './planetHearth.svg';
import './App.css';
import { Jumbotron } from 'reactstrap';

"use strict";

// Settings
const countDownDefault = 100000;
const maxTimeGuessSeconds = 120;
const countriesIterations = 10;


class App extends Component {
  constructor() {
    super()

    this.state = {
      player1: "",
      player2: "",
      score1: 0,
      score2: 0,
      countDown: countDownDefault,
      selectorCountries: [],
      countriesRawResults: [],
      currentCountry: {
        posSelecCountries: 0,
        name: "",
        capital: "",
        subRegion: "",
        population: 0,
        flag: ""
      },
      messages: "",
      currentPage: 'SplashScreen'
    };
    subRegions: [];
  }

  changePage = (page) => {
    this.setState({ currentPage: page });
  };

  setPlayers = (player1, player2) => {
    this.setState({ player1, player2 })
  }

/*  render(){
    return (
      <div>
        {
          () => {
            switch(this.state.currentPage) {
              case 'SplashScreen':
                return <SplashScreen/>

              case 'PlayerScreen':
                return <PlayerScreen/>

              case 'GameScreen':
                return <GameScreen countDown={this.state.countDown}/>

              case 'FinalScreen':
                return <FinalScreen/>
            }
          }
        }
      </div>
    )
  }
*/
  render() {
    const { currentPage } = this.state
    return(
      <div>
        { currentPage === 'SplashScreen' && <SplashScreen changePage={this.changePage}/> }
        { currentPage === 'PlayerScreen' && <PlayerScreen changePage={this.changePage} setPlayers={this.setPlayers}/> }
        { currentPage === 'GameScreen' && <GameScreen countDown={this.state.countDown}/> }
        { currentPage === 'FinalScreen' && <FinalScreen /> }
      </div>
    )
  }
}


class SplashScreen extends Component{

  handleClick = () => {
    this.props.changePage('PlayerScreen')
  }

  render(){
    return (
      <Jumbotron>
        <img src={logo} className="img-fluid" alt="Responsive image"/>
        <div>
          <h5>Do you want to fill your planet?</h5>
          <p>Show your knowledge about earths population, beat your opponent, and fill up your planet with some population!</p>
          <button type="button" className="btn btn-success" onClick={this.handleClick}>Set Players</button>
        </div>
      </Jumbotron>
    )
  }
}

class PlayerScreen extends Component{

  handleSubmit = (e) => {
    e.preventDefault()
    const player1 = e.target.elements.player1.value
    const player2 = e.target.elements.player2.value
    this.props.setPlayers(player1, player2)
    this.props.changePage('GameScreen')
  }

  render(){
    return (
    <Jumbotron>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Planet 1</label>
          <div className="row justify-content-center">
            <input type="text" className="form-control col-sm-5" placeholder="Insert your name" name="player1" required/>
          </div>
        </div>
        <div className="form-group">
          <label>Planet 2</label>
          <div className="row justify-content-center">
            <input type="text" className="form-control col-sm-5" placeholder="Insert your name" name="player2" required/>
          </div>
          <button type="submit" className="btn btn-success">Start Game</button>
        </div>
      </form>
    </Jumbotron>
    )
  }
}

class GameScreen extends Component{

  handleSubmit = () => {
    this.props.changePage('FinalScreen')
  }

  render(){
    return (
      <Jumbotron>
        <div className="display-4">
          <div>
            <Counter peopleCounter={this.props.countDown}/>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              One of three columns
            </div>
            <div className="col-sm">
              <input type="text" className="form-control" placeholder="Insert your name"/>
            </div>
            <div className="col-sm">
              <input type="text" className="form-control" placeholder="Insert your name"/>
            </div>
            <div className="col-sm">
              One of three columns
            </div>
          </div>
        </div>
      </Jumbotron>
    )
  }
}

function Counter (props){

  return (
  <div>
    <img src={planetHearth} className="img-fluid justify-content-center" alt="Responsive image"/>
    <div><h3>{props.peopleCounter}</h3></div>
    <img src={people} className="img-fluid justify-content-center" alt="Responsive image"/>
  </div>
  )
}

function FinalScreen (props){

  return (
  <Jumbotron>
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <img src={player1} className="img-fluid justify-content-center" alt="Responsive image"/>
          One of three columns
        </div>
        <div className="col-sm">
          <input type="text" className="form-control" placeholder="Insert your name"/>
        </div>
        <div className="col-sm">
          <img src={player2_} className="img-fluid" alt="Responsive image"/>
          One of three columns
        </div>
      </div>
    </div>
  </Jumbotron>
  )
}

export default App;
