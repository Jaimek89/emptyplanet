import React, { Component } from 'react';
import logo from './img/logo.svg';
import player1 from './img/player1.svg';
import player2 from './img/player2.svg';
import people from './img/people.svg';
import planetHearth from './img/planetHearth.svg';
import './App.css';
import { Jumbotron } from 'reactstrap';

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

  // Field opcions extra points of Guess the region.
  subRegionField() {
    let arrSubRegions = [];
    this.countriesRawResults.forEach(e => {
      if (arrSubRegions.indexOf(e.subRegion) < 0)
        arrSubRegions.push(e.subRegion.sort); // Filter for no duplicate options
    });
    this.setState({ subRegions: arrSubRegions.sort() });
  }

  actionButton(){
   
    if (this.state.selectorCountries.length < this.state.currentCountry.posSelecCountries) {
        this.setState({ enableOK: false });
        this.setState({ win: 0 });
        this.currentCountry(this.state.currentCountry.posSelecCountries+1)
        this.countDown(1);
      }

    else if (this.state.selectorCountries.length = this.state.currentCountry.posSelecCountries) {
      this.setState({ currentPage: "FinalScreen" });
      this.setState({ enableOK: false });
    }

  }



  countDown = (onOff) => {
    let substractFraction = Math.round(
      countDownDefault / (maxTimeGuessSeconds * 2)
    );
    const subsCounter = () => {
      console.log(onOff)
      this.setState(prevState => {
        return { countDown: prevState.countDown - substractFraction };
      });

      if (onOff === 0) {
        //console.log(clock), console.log("sw");
        clearInterval(clock);
      }
      if (this.state.countDown <= 0)  {clearInterval(clock), console.log('countDown0')}
    };
    let clock = setInterval(subsCounter, 500); //1/2 second
    console.log(clock)

  };

  // stopCountDown() {
  //   clearInterval(this.countDown);
  // }

  retrieveCountries() {
    apiCountries
      .searchAllCountries()
      .then(countries => this.setState({ countriesRawResults: countries }))
      .then(() =>
        this.randomArrNumber(
          countriesIterations,
          this.state.countriesRawResults.length
        )
      )
      .then(() =>
        this.currentCountry(this.state.currentCountry.posSelecCountries)
      );

    //
  }

  //reset 0

  componentWillMount() {
    this.areYouRight();
    if (typeof this.countriesRawResults === "undefined") {
      console.log("call API");
      this.retrieveCountries();
    }

    if ( this.state.tryAnswer == this.state.currentCountry.population ){   /// WIN
        this.countDown(0)
        this.setState({ win: 1 });
        this.serState({ messages: 'You guess the population'})
        addToScore(this.state.focusPlayer);
        this.setState({ enableOK: true });
    }
  }

  areYouRight() {
    if (
      this.state.tryAnswer === this.state.currentCountry.population &&
      this.state.screen === "GameScreen"
    )
      this.state.currentCountry.population = 1;
  }

  changePage = page => {
    this.setState({ currentPage: page });
  };

  // Insert the name of the planets.
  setPlayers = (player1, player2) => {
    this.setState({ player1: player1, player2: player2 });
  };

  // (Number of iterations, Maximun Random Number that you can modify in top settings )
  randomArrNumber(iterArr, maxRandomNum) {
    let arrResult = [];

    for (let i = 0; i <= iterArr - 1; i++) {
      let loop = 0;
      let randomNum;
      while (loop == 0) {
        randomNum = Math.floor(Math.random() * maxRandomNum);
        if (arrResult.indexOf(randomNum) < 0) loop = 1;
      }
      arrResult.push(randomNum);
    }
    this.setState({ selectorCountries: arrResult });
  }

  // Updating the Score.
  addToScore(player) {
    if (player === 1) {
      this.setState(prevState => {
        score1: prevState.score1 + this.state.countDown;
      });
    } else {
      this.setState(prevState => {
        score2: prevState.score2 + this.state.countDown;
      });
    }
    this.setState; //Reset Count Down
  }

  // Field the object of country that are playing at this momment

  currentCountry(posArrRandom) {
    // start with 0, 1, 2, 3...
    let posRawData = this.state.selectorCountries[posArrRandom];

    this.setState({
      currentCountry: {
        posSelecCountries: posArrRandom,
        name: this.state.countriesRawResults[posRawData].name,
        capital: this.state.countriesRawResults[posRawData].capital,
        subRegion: this.state.countriesRawResults[posRawData].subRegion,
        population:
          Math.round(
            this.state.countriesRawResults[posRawData].population / 100000
          ) / 10,
        flag: this.state.countriesRawResults[posRawData].flag,
        latlng: this.state.countriesRawResults[posRawData].latlng,
        alpha3Code: this.state.countriesRawResults[posRawData].alpha3Code
      }
    });
  }

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
