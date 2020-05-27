import React, { Component } from 'react'

import '../css/App.css'

import Card from '../components/Card'
import GuessCount from '../components/GuessCount'
import HallOfFame from '../components/HallOfFame'
import { connect } from 'react-redux'
import { flipUpCard } from '../actions/CardsActions'

class App extends Component {

  render() {
    return (
      <div className="memory">
        <GuessCount guesses={this.props.guesses} />
        {this.props.cards.map(card =>
          <Card
            key={card.key}
            id={card.id}
            card={card.card}
            feedback={card.feedback}
            onClick={this.props.handleCardClick}
          />
        )}        
        <HallOfFame entries={this.props.hallOfFame} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      cards: state.cards,
      guesses: state.guesses,
      hallOfFame: state.hallOfFame
  }
}

const mapDispatchToProps = dispatch => {
  return {
      handleCardClick: key => {
          dispatch(flipUpCard(key));
      },
  }
}

const AppView = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppView;
