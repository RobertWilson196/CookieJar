import React, { Component } from 'react';

class CardCounter extends Component {
    render() {
        return (
        <div className="card-counter">
        {this.props.value}
        <h5>{this.props.name}</h5>
        </div>
        );
    }
}

export default CardCounter;