import React, { Component } from 'react';

import { HIDDEN_SYMBOL } from '../constants/constants'

import '../css/Card.css'

class Card extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
}

  onClick() {
        this.props.onClick(this.props.id);
  }

render() {
    return(
    <div className={`card ${this.props.feedback}`} onClick={this.onClick}>
    <span className="symbol">
        {this.props.feedback === 'hidden' ? HIDDEN_SYMBOL : this.props.card}
      </span>
    </div>
    )
  }
}
export default Card