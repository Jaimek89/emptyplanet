
import React, { Component } from 'react';
import map from './img/map.png';
import logo from './img/logo.svg';
import imgPlayer1 from './img/player1.svg';
import imgPlayer2 from './img/player2.svg';
import people from './img/people.svg';
import planetHearth from './img/planetHearth.svg';
import './App.css';
import { Jumbotron, Container, Row, Col, Button } from 'reactstrap';

//import BaseMap from "./components/Maps/BaseMap";
import apiCountries from "./Helpers/ApiCountries";

("use strict");
// Settings
const countDownDefault = 100000;
const maxTimeGuessSeconds = 12;
const countriesIterations = 10;
const extraBonus = 2000;

class App extends Component {
  constructor() {
    super();

    this.state = {
      player1: "",
      player2: "",
      score1: 0,
      score2: 0,
      countDown: countDownDefault,
      substractCountDown: false,
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

  //////////////////////////////Behaviour Button/////////////////////////////


  actionButton() {
    //Action Button
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
      // Last Screen
      (this.state.selectorCountries.length = this.state.currentCountry.posSelecCountries)
    ) {
      this.setState({ currentPage: "FinalScreen" });
      this.setState({ enableOK: false });

    }
  }


  //////////////////////////////Game Play/////////////////////////////

  setSubstractCountDown = val => {
    if (val === true) {
      this.setState({ substractCountDown: true });
      console.log("Sub True");
    } else this.setState({ substractCountDown: false });
  };


  componentWillMount() {
    let clock = setInterval(this.countDown, 500);

    // MOVE LOGIC
    if (typeof this.countriesRawResults === "undefined") {
      //Inicialization
      this.retrieveCountries();

      this.randomFocusPlayer();
    } else if (

      this.state.tryAnswer === this.state.currentCountry.population &&
      this.state.screen === "GameScreen"
    ) {
      /// WIN
      this.countDown(0);
      this.setState({ win: 1 });
      this.serState({ messages: "You guess the population" });
      this.addToScore(this.state.focusPlayer);
      this.setState({ enableOK: true });
    } else if (
      this.state.tryAnswer != this.state.currentCountry.population &&
      this.state.screen === "GameScreen"
    ) {
      /// Wrong attemp
      this.serState({ messages: "You guess the population" });
      this.changePlayer();
    } else if (
      this.state.countDown === 0 &&
      this.state.screen === "GameScreen"
    ) {
      /// Wrong attemp
      this.serState({
        messages: "Ups, You don't have people to take for your planet"
      });
      this.changePlayer();
    }
  }

  addToScoreBonus(player) {
    if (player === 1) {
      this.setState(prevState => {
        score1: prevState.score1 + extraBonus;
      });
    } else {
      this.setState(prevState => {
        score2: prevState.score2 + extraBonus;
      });

    }
    this.setState; //Reset Count Down
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
  }

  extraBonus = (capital, region) => {
    if (capital === this.state.currentCountry.capital) {
      this.addToScoreBonus(this.state.focusPlayer);
      this.setState({ messages: "You are right whith the capital " });
    } else this.setState({ messages: "You are wrong whith the capital " });

    if (region === this.state.currentCountry.subRegion) {
      this.addToScoreBonus(this.state.focusPlayer);
      this.setState(prevState => {
        messages: prevState.messages + "and you know the region";
      });
    } else {
      this.setState(prevState => {
        messages: prevState.messages + "and you don't know the region";
      });
    }
  };

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

  changePlayer() {
    if (this.state.focusPlayer === 1) this.setState({ focusPlayer: 2 });
    else this.setState({ focusPlayer: 1 });
  }

  //////////////////////////////Count Down/////////////////////////////

  countDown = () => {
    let substractFraction = Math.round(
      countDownDefault / (maxTimeGuessSeconds * 2)
    );
    console.log("clock");

    if (this.state.substractCountDown === true) {
      if (this.state.countDown <= 0) {
        this.setState({ substractCountDown: false });
        this.setState({ countDown: 0 });
      } else {
        this.setState(prevState => {
          return { countDown: prevState.countDown - substractFraction };
        });
      }
    }
  };

  //////////////////////////////iniciatization/////////////////////////////

  randomFocusPlayer = () => {
    this.setState({ focusPlayer: Math.round(Math.random()) + 1 });
  };

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
  }

  // (Number of iterations, Maximun Random Number that you can modify in top settings )

  randomArrNumber(iterArr, maxRandomNum) {
    let arrResult = [];

    for (let i = 0; i <= iterArr - 1; i++) {
      let loop = 0;
      let randomNum;
      while (loop === 0) {
        randomNum = Math.floor(Math.random() * maxRandomNum);
        if (arrResult.indexOf(randomNum) < 0) loop = 1;
      }
      arrResult.push(randomNum);
    }
    this.setState({ selectorCountries: arrResult });
  }

  // Insert the name of the players.
  setPlayers = (player1, player2) => {
    this.setState({ player1: player1, player2: player2 });
  };

  // Field opcions extra points of Guess the region.
  subRegionField() {
    let arrSubRegions = [];
    this.countriesRawResults.forEach(e => {
      if (arrSubRegions.indexOf(e.subRegion) < 0)
        arrSubRegions.push(e.subRegion.sort); // Filter for no duplicate options
    });
    this.setState({ subRegions: arrSubRegions.sort() });
  }

  changePage = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { currentPage } = this.state;
    return (
      <Container fluid={true}>
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
            setSubstractCountDown={this.setSubstractCountDown}
          />
        )}
        {currentPage === "GameScreen" && (
          <GameScreen
            countDown={this.state.countDown}

            setTries={this.setTries} 
            changePage={this.changePage}
            player1={this.state.player1}
            player2={this.state.player2}
            name={this.state.currentCountry.name}
            win={this.state.win}
            focusPlayer={this.state.focusPlayer}

          />
        )}
        {currentPage === "FinalScreen" && <FinalScreen 
          player1={this.state.player1}
          player2={this.state.player2}
        />}
      </Container>
    );
  }
}

class SplashScreen extends Component {

  handleClick = () => {
    this.props.changePage("PlayerScreen");
    //this.props.callAPI()
  };

  render() {
    return (
      <Jumbotron>
        <img src={logo} className="img-fluid" alt="Responsive image" />
        <div>

          <h5>Do you want to fill your planet?</h5>
          <p>
            Show your knowledge about earths population, beat your opponent, and
            fill up your planet with some population!
          </p>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.handleClick}
          >
            Set Players
          </button>

        </div>
      </Jumbotron>
    );
  }
}

class PlayerScreen extends Component {


  handleSubmit = (e) => {
    e.preventDefault()
    const player1 = e.target.elements.player1.value
    const player2 = e.target.elements.player2.value
    this.props.setPlayers(player1, player2)
    this.props.changePage('GameScreen')
  }

  render() {
    return (

    <Jumbotron>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <h4>Planet 1</h4>
          <div className="row justify-content-center">
            <input type="text" className="form-control col-sm-5" placeholder="Insert your name" name="player1" autoFocus={true} required/>
          </div>
        </div>
        <div className="form-group">
          <h4>Planet 2</h4>
          <div className="row justify-content-center">
            <input type="text" className="form-control col-sm-5" placeholder="Insert your name" name="player2" required/>
          </div>
          <br></br>
          <button type="submit" className="btn btn-success">Start Game</button>
        </div>
      </form>
    </Jumbotron>

    )
  }
}

class GameScreen extends Component {


  handleSubmit = (e) => {
    e.preventDefault()
    let tries = e.target.elements.tries.value
    console.log(tries)
    this.props.setTries(tries)
    this.props.changePage('FinalScreen')
  }

  render() {
    return (
      <Jumbotron>
        <div className="boxCounter">
          <Counter peopleCounter={this.props.countDown}/>
        </div>
        <form onSubmit={this.handleSubmit}>
          <Container>
            <Row>
              <Col>
                {this.props.player1}
                <img src={imgPlayer1} className="img-fluid justify-content-center" alt="Responsive image"/>
                {this.props.focusPlayer === 1
                ?
                <label>Es mi turno!!</label>
                :
                undefined
                }
              </Col>
              {/* TODO Box Message: box enlazada con el state.message */}
              <Col>
                <div className="card-header">{this.props.name}</div>
                <div className="card-body text-primary">
                  <p className="card-text">Can you guess the population of this country?</p>
                </div>
              </Col>
              <Col>
                {this.props.player2}
                <img src={imgPlayer2} className="img-fluid" alt="Responsive image"/>
                {this.props.focusPlayer === 2
                ?
                <label>Es mi turno!!</label>
                :
                undefined
                }
              </Col>
            </Row>
            <Row>
              <Col>
                <input type="text" className="form-control" name='tries' placeholder="Try to guess" autoFocus={true} required/>
              </Col>
            </Row>
            <Row>
              <Col>
                <button type="submit" className="btn btn-success">Start Game</button>
              </Col>
            </Row>
          </Container>

        </form>
        <div>
          {/* TODO Button ready/go para pasar de ronda / pais. en el state será buttonok (true or false) */}
          {this.props.win != 0
          ? 
          <button type="button" className="btn btn-lg btn-primary">Next Country</button>
          :
          undefined 
          }
        </div>
      </Jumbotron>
    )
  }
}


function Counter (props){

  return (
    <div className="boxCounter">
      <img src={planetHearth}/>
      <div className="card border-primary mb-3">
        <h3>{props.peopleCounter}</h3>
        <img src={people}/>
      </div>

    </div>
  )
}


class FinalScreen extends Component{

  render(){
    return (
      <Jumbotron>
        <div className="container">
          <div className="row">
            <div className="col-sm">One of three columns</div>
            <div className="col-sm">

              <img src={imgPlayer1}/>
              {this.props.player1}
            </div>
            <div className="col-sm">
              <input type="text" className="form-control" placeholder="Insert your name"/>
            </div>
            <div className="col-sm">
              <img src={imgPlayer2}/>
              {this.props.player2}
            </div>
            <div className="col-sm">One of three columns</div>
          </div>
        </div>
      </Jumbotron>
    );
  }
}

export default App;
