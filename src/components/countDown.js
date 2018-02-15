import React from "react"

countDown = onOff => {
  let substractFraction = Math.round(
    countDownDefault / (maxTimeGuessSeconds * 2)
  );
  const subsCounter = () => {
    console.log(onOff);
    this.setState(prevState => {
      return { countDown: prevState.countDown - substractFraction };
    });

    if (onOff === 0) {
      //console.log(clock), console.log("sw");
      clearInterval(clock);
    }
    if (this.state.countDown <= 0) {
      this.setState({ countDown: 0 });
      clearInterval(clock), console.log("countDown0");
    }
  };
  let clock = setInterval(subsCounter, 500); //1/2 second
  console.log(clock);
};

export default countDown;