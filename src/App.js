import React, { Component } from 'react';
import logo from './img/logo.svg';
import player1 from './img/player1.svg';
import player2 from './img/player2.svg';
import people from './img/people.svg';
import planetHearth from './img/planetHearth.svg';
import './App.css';
import { Jumbotron } from 'reactstrap';
import gamePlay from './components/gamePlay'
import countDown from './components/countDown'
import initialization from './components/initialization'


//import BaseMap from "./components/Maps/BaseMap";
import apiCountries from "./Helpers/ApiCountries";

"use strict";
// Settings
const countDownDefault = 100000;
const maxTimeGuessSeconds = 12;
const countriesIterations = 10;


class App extends Component {
  constructor() {
    super();

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
        population: 0.11,
        flag: "",
        latlng: [0, 0],
        alpha3Code: "DZA"
      },
      messages: "",
      subRegions: [],
      currentPage: "SplashScreen",
      focusPlayer: 1,
      tryAnswer: 0,
      win: 0,
      enableOK: false
    };
  }

  actionButton() {
    if (
      this.state.selectorCountries.length <
      this.state.currentCountry.posSelecCountries
    ) {
      this.setState({ countDown: countDownDefault }); //Inicialice CountDown
      this.setState({ enableOK: false });
      this.setState({ win: 0 });
      this.currentCountry(this.state.currentCountry.posSelecCountries + 1); // Next Country
      this.countDown(1); // Start CounDown
    } else if (
      (this.state.selectorCountries.length = this.state.currentCountry.posSelecCountries)
    ) {
      this.setState({ currentPage: "FinalScreen" });
      this.setState({ enableOK: false });
    }
  }

  componentWillMount() {
    this.areYouRight();
    if (typeof this.countriesRawResults === "undefined") {
      //Inicialization
      this.retrieveCountries();
    }

    if (
      this.state.tryAnswer === this.state.currentCountry.population &&
      this.state.screen === "GameScreen"
    ) {
      /// WIN
      this.countDown(0);
      this.setState({ win: 1 });
      this.serState({ messages: "You guess the population" });
      addToScore(this.state.focusPlayer);
      this.setState({ enableOK: true });
    }

      if (this.state.tryAnswer != this.state.currentCountry.population && 
        this.state.screen === "GameScreen") {
        /// Wrong attemp
        this.serState({ messages: "You guess the population" });
        this.changePlayer();
      }
  }

  changePage = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { currentPage } = this.state;
    return (
      <div>
        {currentPage === "SplashScreen" && (
          <SplashScreen
            changePage={this.changePage}
            callAPI={this.retrieveCountries}
          />
        )}
        {currentPage === "PlayerScreen" && (
          <PlayerScreen
            changePage={this.changePage}
            setPlayers={this.setPlayers}
            countDown={this.countDown}
          />
        )}
        {currentPage === "GameScreen" && (
          <GameScreen countDown={this.state.countDown} />
        )}
        {currentPage === "FinalScreen" && <FinalScreen />}
      </div>
    );
  }
}


class SplashScreen extends Component{

  handleClick = () => {
    this.props.changePage("PlayerScreen")
    //this.props.callAPI()
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
    this.props.countDown(1)
    setTimeout(
      this.props.countDown(0)
    , 5000);


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
          <img src={player2} className="img-fluid" alt="Responsive image"/>
          One of three columns
        </div>
      </div>
    </div>
  </Jumbotron>
  )
}

export default App;
