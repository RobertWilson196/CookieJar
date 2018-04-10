import React, { Component } from 'react';

class CardCounter extends Component {
    render() {
        return <div className="card-counter">{this.props.value}</div>
    }
}

export default CardCounter;