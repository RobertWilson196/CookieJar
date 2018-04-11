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
        isTurn: true,
      },
      winner: 'Dealer',
    }
    this.dealCard = this.dealCard.bind(this);
  }

  reset() {
    this.setState({
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
        isTurn: true,
      },
      winner: 'Dealer',
    })
  }

  endTurn() {
    const tempPlayer = this.state.player;
    const tempDealer = this.state.dealer;
    
    this.setState({
      player: {
        ...tempPlayer,
        isTurn: false,
      },
      dealer: {
        ...tempDealer,
        isTurn: true,
      },
    })

    console.log(this.state.player)
  }

  dealCard(target) {

    let cardValue = (Math.floor(Math.random() * 10)) + 1;
    let tempWinner = '';
    const tempState = this.state[target];

    const checkResults = (target, cardValue) => {
      if(tempState.toMax < 5 && target === "dealer") {
        console.log('dealer end');
        if(this.state.dealer.total > this.state.player.total &&
           !this.state.dealer.isBust) {
          tempWinner = 'Dealer';
        } else if (this.state.player.total > this.state.dealer.total &&
        !this.state.player.isBust) {
          tempWinner = 'Player';
        } else { tempWinner = 'Draw' };
        this.setState({
          dealer: {
            ...tempState,
            isTurn: false,
          },
          winner: tempWinner,
        })
        return;
      }
      let tempValue = tempState.toMax - cardValue;
      if(tempValue === 0) {
        console.log('blackjack');
      } else if (tempValue < 0) { // negative value
        this.setState({
          [target]: {
            ...tempState,
            cardCount: tempState.cardCount + 1,
            total: tempState.total + cardValue,
            toMax: tempState.toMax - cardValue,
            isBust: true,
            isTurn: false,
          }
        })
      } else {     
        this.setState({
          [target]: {
            ...tempState,
            cardCount: tempState.cardCount + 1,
            total: tempState.total + cardValue,
            toMax: tempState.toMax - cardValue,
          }
        });
      }  
    }
    checkResults(target, cardValue);
  }

  render() {
    if(this.state.player.isTurn) {
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
            <button onClick={() => this.endTurn()}>Stand</button>
          </div>
        </div> );
    } else if(this.state.dealer.isTurn) {
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
          <button onClick={() => this.dealCard('dealer')}>Hit Dealer</button>
        </div>
      </div> );
    } else {
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
          <h1>Winner: {this.state.winner}</h1>
        </div>
        <div className="flex-container-h">
          <button onClick={() => this.reset()}>Restart Game</button>
        </div>
      </div> );
    }
  }
}

export default App;
