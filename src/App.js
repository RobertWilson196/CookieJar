import React, { Component } from 'react';
import CardCounter from './CardCounter';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dealer: {
        total: 0,
        cardCount: 0,
        toMax: 21,
        isBust: false,
        isTurn: false,
      },
      player: { 
        total: 0,
        cardCount: 0,
        toMax: 21,
        isBust: false,
        isTurn: false,
      },
    }
    this.dealCard = this.dealCard.bind(this);
    this.checkResults = this.checkResults.bind(this);
  }

  checkResults(target) {
    const tempState = this.state[target];
    tempState.toMax
    if(tempState.toMax === 0) {
      console.log('blackjack');
    } else if (tempState.toMax < 0) { // negative value
      this.setState({
        ...tempState,
        isBust: true,
      })
    }
    console.log('test',tempState.toMax);
  }

  dealCard(target) {
    let cardValue = (Math.floor(Math.random() * 10)) + 1;
    const tempState = this.state[target];
    this.setState({
      [target]: {
        ...tempState,
        cardCount: tempState.cardCount + 1,
        total: tempState.total + cardValue,
        toMax: tempState.toMax - cardValue,
      }
    });
    console.log(cardValue);
    this.checkResults(target);
  }

  render() {
    return (
      <div>
        <h1>Cookie Jar</h1>
        <div className="flex-container-h">
          <div>Dealer</div>
          <CardCounter value={this.state.dealer.total} />
        </div>
        <div className="flex-container-h">
          <div>You</div>
          <CardCounter value={this.state.player.total} />
        </div>
        <div className="flex-container-h">
          <button onClick={() => this.dealCard('player')}>Hit!</button>
          <button onClick={() => console.log(this.state.player)}>Stand</button>
          <button onClick={() => this.dealCard('dealer')}>Hit Dealer</button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let tempValue = (Math.floor(Math.random() * 10)) + 1;
    this.setState({
      dealer: {
        total: tempValue,
        cardCount: 1,
        toMax: 21 - tempValue,
        isBust: false,
        isTurn: false,
      },
    })
  }
}

export default App;
