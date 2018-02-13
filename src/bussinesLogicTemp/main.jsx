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
      selectorCountries : [],
      CountriesResults:[]
    }
  }
  

  countDown() {
    setInterval(subsCounter, 500); //1/2 second
    let substractFraction = (countDownDefault / (maxTimeGuessSeconds * 100)) * 5;   // pass to 100 milisecond * 5
    function subsCounter() {
      this.setState(prevState => {
      countDown : prevState.countDown-substractFraction
      })
    }
  }


  insertPlayers(name, player){

    if (player === 1) this.setState({player1: player });
    else this.setState({ player2: player });

  }


  randomArrNumber(iterArr, maxRandomNum) {   // (Number of iterations, Maximun Random Number  )
    let arrResult = []

    for (i=0; i<= iterationArr ; i++){
        arrResult.push(Math.floor(Math.random() * maxRandomNum))
    }
    this.setState({ selectorCountries: arrResult });

  }


  addToScore (player){
    if (player === 1){
      this.setState(prevState => {
      score1 : prevState.score1+this.countDown
      })
    }
    else {
      this.setState(prevState => {
      score2 : prevState.score2+this.countDown
      })
    }
    this.setState({ countDown: countDownDefault});  //Reset Count Down
  }




}

 




ReactDOM.render(<TaskApp />, document.getElementById("root"));
