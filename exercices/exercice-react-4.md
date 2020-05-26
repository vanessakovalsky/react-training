# Ajout d'un formulaire et gestion du flux avec Redux

Ce quatrième exercice a pour objectifs : 
* D'ajouter un formulaire pour soummetre notre nom
* D'utiliser redux pour gérer le flux de données et leur mise à jour
* De rendre dynamique le tableau des meilleurs score
L'utilisation de Redux, permet de sortir la logique métier du composant container, mais aussi de centraliser l'ensemble des données

## Ajouter le formulaire
* Créer un nouveau composant appelé AddPlayer 
* Celui-ci contiendra un formulaire permettant de saisir son nom
* Ajouter en titre de page le nom du joueur 
* Lors de la fin de la partie, ajouter au tableau des gagnants le nom saisi, la date et le score 

## Utiliser Redux pour gére le flux 
* La doc de react-redux est disponible ici : https://react-redux.js.org/ 
* Installer redux et react redux
```
npm install redux
npm install react-redux
```
* Reorganiser les fichiers de src en suivant l'arborescence de redux (créer les dossiers / fichiers manquants):
```
|actions
|-CardsActions.js
|container
|-App.js
|constants
|-CardsConstants.js
|components
|-Card.js
|-GuessCount.js
|-HallOfFame.js
|css
|-App.css
|-Card.css
|-HallOfFame.css
|reducers
|-CardReducers.js
|index.js
```
* NB : sur une application plus importante, le découpage serait probablement fait par domaine puis par Action/ reducer / constants / composants spécifiques au domaine
* Dans le fichier des constantes, déclarer les 3 constantes utilisée dans App, puis importer ces constantes dans App.js
```
export const SIDE = 6
export const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
```
* Déclaration des actions dans actions/CardActions.js : 
```
export const FLIP_UP_CARD = 'FLIP_UP_CARD';
export const SHUFFLE_CARDS = 'SHUFFLE_CARDS';
export const CHECK_MATCHED_PAIR = 'CHECK_MATCHED_PAIR';
export const MARK_PAIR_AS_MATCHED = 'MARK_PAIR_AS_MATCHED';
export const FLIP_DOWN_PAIR = 'FLIP_DOWN_PAIR';
export const INIT_GAME = 'INIT_GAME';

export function initGame() {
  return { type: INIT_GAME };
}

export function flipDownPair(id1, id2) {
  return { type: FLIP_DOWN_PAIR, id1: id1, id2: id2 }
}
export function markPairAsMatched(id1, id2) {
  return { type: MARK_PAIR_AS_MATCHED, id1: id1, id2: id2 }
}

export function checkMatchedPair() {
  return { type: CHECK_MATCHED_PAIR };
}

export function flipUpCard(index) {
  return { type: FLIP_UP_CARD, index };
}

export function shuffleCards() {
  return { type: SHUFFLE_CARDS };
}
```
* Créer le reducer et le faire correspondre aux actions (ici seulement l'action FLIP_UP_CARD est présente à vous de compléter la suite):
```
import {
    FLIP_UP_CARD, 
} from "../actions/CardsActions";
import { generateCards } from '../CardsFunctions'


const initialState = {
    cards: generateCards(),
    card1: null,
    card2: null,
    guesses: 0,
};

 function memoryGame(state = initialState, action) {
    switch (action.type) {
        case FLIP_UP_CARD:
            return Object.assign({}, state, {
                card1: action.index,
                card2: null,
                cards: state.cards.map((card) => {
                        if (action.index === card.key){
                            return Object.assign({}, card, { feedback : 'visible' }) 
                        }
                        return card
                        })
            });

            default:
                return state;
    }
}

export default memoryGame
```
* Ajouter dans le reducer les fonctions métier manquantes
* Gérer les données avec mapStateToProp, dans App.js
```
const mapStateToProps = state => {
  return {
      cards: state.cards,
      guesses: state.guesses,
  }
}
```
* Connecter les composants aux actions avec la fonction connect() dans le App.js
```
const AppView = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppView;
```
* Modifier les fonctions déclenchant les évènements pour appeler les actions (onclick par exemple) sur le App.js et sur le Cards.js:
```
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
```
* Sur le App.js aussi il y a des modifications à faire sur le composant :
```
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
        <HallOfFame entries={FAKE_HOF} />
      </div>
    )
  }
}
```
* On fait correspondre dans le app JS les évènement au click avec les actions :
```
const mapDispatchToProps = dispatch => {
  return {
      handleCardClick: key => {
          dispatch(flipUpCard(key));
      },
  }
}
```
* Instancier le store et le provider dans index.js:
```
const store = createStore(cardsReducers)

ReactDOM.render(
    <Provider store={store}>
    <App />   
    </Provider>,
    document.getElementById('root'))
```
--> Les données sont maintenant centralisé dans le store, et le flux géré par redux, ce qui allège énormément les composants de React
