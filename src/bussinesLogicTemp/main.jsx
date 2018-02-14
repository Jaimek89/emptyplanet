/** Libraries */
import React, { Component } from 'react';
import { Container , Row, Col } from 'reactstrap';

/** Components */
import BaseMap from './components/Maps/BaseMap'
import apiCountries from './Helpers/ApiCountries'


"use strict";


// Settings
const  countDownDefault = 100000;
const  maxTimeGuessSeconds = 120;
const  countriesIterations = 10;


class gameApp extends React.Component {
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
        latlng: []
      },
      messages: "",
      subRegions: [],
      screen: "SplashScreen",
      focusPlayer: 1,
      tryAnswer: 0,
      win:0
    };
  }

  // Field opcions extra points of Guess the region.
  subRegionField() {
    arrSubRegions = [];
    countriesRawResults.forEach(e => {
      if (arrSubRegions.indexOf(e.subRegion.sort) < 0)
        arrSubRegions.push(e.subRegion.sort); // Filter for no duplicate options
    });
    this.setState({ subRegions: arrSubRegions.sort() });
  }

  // Update every half second the population score when are playing game.
  countDown() {
    setInterval(subsCounter, 500); //1/2 second
    let substractFraction = countDownDefault / (maxTimeGuessSeconds * 100) * 5; // pass to 100 milisecond * 5
    function subsCounter() {
      this.setState(prevState => {
        countDown: prevState.countDown - substractFraction;
      });
    }
  }
  stopCountDown() {
    clearInterval(countDown);
  }

  componentWillMount() {
        areYouRight() 
  }
  areYouRight() {
      if (this.state.tryAnswer === this.state.currentCountry.population && this.state.screen === "GameScreen") this.state.currentCountry.population = 1;
  }

  updateScreen (screen){
      this.setState({screen: screen});
  }



  // Insert the name of the planets.
  insertPlayers(name, player) {
    if (player === 1) this.setState({ player1: player });
    else this.setState({ player2: player });
  }

  // (Number of iterations, Maximun Random Number that you can modify in top settings )
  randomArrNumber(iterArr, maxRandomNum) {
    let arrResult = [];

    for (i = 0; i <= iterationArr; i++) {
      arrResult.push(Math.floor(Math.random() * maxRandomNum));
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
        latlng: this.state.countriesRawResults[posRawData].flag
      }
    });
  }
  render() {
    switch (this.state.screen) {
      case "SplashScreen":
        <SplashScreen />;
        break;

      case "PlayerScreen":
        <PlayerScreen />;
        break;

      case "GameScreen":
        <GameScreen />;
        break;

      case "FinalScreen":
        <FinalScreen />;
        break;
    }
  }
}







ReactDOM.render(<TaskApp />, document.getElementById("root"));
