import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'

import Card from './Card'
import GuessCount from './GuessCount'
import HallOfFame, { FAKE_HOF } from './HallOfFame'

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750

class App extends Component {

  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    matchedCardIndices: [],
  }

  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }

  // arrow function to guarantee "this" binding
  handleCardClick = (index) => {
    const { matchedCardIndices } = this.state
    
    if( !matchedCardIndices.includes(index) ){
      const { currentPair } = this.state
      if (currentPair.length === 2) {
        return
      }
      if (currentPair.length === 0) {
        this.setState({ currentPair: [index] })
        return
      }
      this.handleNewPairClosedBy(index)
    }
  }

  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state

    if(index !== currentPair[0]){
      const newPair = [currentPair[0], index]
      const newGuesses = guesses + 1
      const matched = cards[newPair[0]] === cards[newPair[1]]
      this.setState({ currentPair: newPair, guesses: newGuesses })
      if (matched) {
        this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
      }
      setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
    }


  }

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)
    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }
  
    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }
  
    return indexMatched ? 'visible' : 'hidden'
  }

  render() {
    const { cards, guesses } = this.state
    return (
      <div className="memory">
        <GuessCount guesses={guesses} />
        {cards.map((card, index) =>
          <Card
            key={index}
            index={index}
            card={card}
            feedback={this.getFeedbackForCard(index)}
            onClick={this.handleCardClick}
          />
        )}
        <HallOfFame entries={FAKE_HOF} />
      </div>
    )
  }
}

export default App