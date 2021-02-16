import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    console.log("constructor called")
    super(props);
    const { value1, value2, value3, proposedAnswer } = this.newValues();
    this.state = {
      value1: value1,
      value2: value2,
      value3: value3,
      proposedAnswer: proposedAnswer,
      numQuestions: 0,
      numCorrect: 0
    };
  };
  newValues() {
    console.log("newValues called")
    const value1 = Math.floor(Math.random() * 100)
    const value2 = Math.floor(Math.random() * 100)
    const value3 = Math.floor(Math.random() * 100)
    const proposedAnswer = Math.floor(Math.random() * 3) + value1 + value2 + value3
    return {value1, value2, value3, proposedAnswer}
  }
  
  newQuestion = () => {
    console.log("newQuestion called")
    const { value1, value2, value3, proposedAnswer } = this.newValues();
    this.setState((currentState) => ({
      value1: value1,
      value2: value2,
      value3: value3,
      proposedAnswer: proposedAnswer
    }))
  }

  tallyResponse = event => {
    console.log("tallyResponse called")
    let response = (event.target.name === "true") ? true : false;
    let realAnswer = this.state.value1 + this.state.value2 + this.state.value3
    let correctResponse = Boolean(realAnswer === this.state.proposedAnswer)
    console.log(`raw response: ${event.target.name}`);
    console.log(`correct response: ${correctResponse}`);
    console.log(`received response: ${response}`)
    if (correctResponse === response) {
      this.setState((currentState) => ({
        numCorrect: currentState.numCorrect + 1,
        numQuestions: currentState.numQuestions + 1
        }))
    } else {
      this.setState((currentState) => ({
        numQuestions: currentState.numQuestions + 1
        }))
    }
    this.newQuestion()
  }

  render() {
    console.log("render called")
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <div className="game">
          <h2>Mental Math</h2>
          <div className="equation">
            <p className="text">{`${this.state.value1} + ${this.state.value2} + ${this.state.value3} = ${this.state.proposedAnswer}`}</p>
          </div>
          <button name="true" onClick={this.tallyResponse}>True</button>
          <button name="false" onClick={this.tallyResponse}>False</button>
          <p className="text">
            Your Score: {this.state.numCorrect}/{this.state.numQuestions}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
