import React, { Component } from 'react';
import CardCounter from './CardCounter';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dealer: {
        total: 2,
        cardCount: 0,
        isBust: false,
        isTurn: false,
      },
      player: { 
        total: 3,
        cardCount: 0,
        isBust: false,
        isTurn: false,
      },
    }
    this.dealCard = this.dealCard.bind(this);
  }

  dealCard(target) {
    [target].total += 1;
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
          <button onClick={() => console.log('Hit!')}>Hit!</button>
          <button onClick={() => console.log('Stand')}>Stand</button>
        </div>
      </div>
    );
  }
}

export default App;
