import {
    FLIP_UP_CARD, 
} from "../actions/CardsActions";
import { generateCards, generateHall } from '../CardsFunctions'
import { ADD_PLAYER } from "../actions/addPlayer"

const initialState = {
    cards: generateCards(),
    card1: null,
    card2: null,
    guesses: 0,
    hallOfFame: generateHall()
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
        case ADD_PLAYER:
                let new_fame = {name: action.name}
                return Object.assign({}, state, {
                    card1: action.index,
                    card2: null,
                    cards: state.cards,
                    hallOfFame: state.hallOfFame.push(new_fame)
                });
        default:
                return state;
    }
}

export default memoryGame