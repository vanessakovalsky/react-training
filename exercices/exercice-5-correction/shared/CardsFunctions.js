
import shuffle from 'lodash.shuffle'

import { SIDE, SYMBOLS } from "./constants/constants.js"

export function generateCards(){
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    for (let i = 0; result.length < size; i+=2) {
        let symbol = candidates.pop()
        const card = {
            card: symbol,
            feedback: 'hidden',
            key: i,
            id: i
        }
        const card2 = {
            card: symbol,
            feedback: 'hidden',
            key: i+1,
            id: i+1
        }
        result.push(card, card2)
    }
    return shuffle(result)
}

const FAKE_HOF = [
    { id: 3, guesses: 18, date: '10/10/2017', player: 'Jane' },
    { id: 2, guesses: 23, date: '11/10/2017', player: 'Kevin' },
    { id: 1, guesses: 31, date: '06/10/2017', player: 'Louisa' },
    { id: 0, guesses: 48, date: '14/10/2017', player: 'Marc' },
  ]

export function generateHall(){
    const result = []
    FAKE_HOF.forEach (player => {
        const fame = {
            name: player.player,
            key: player.id,
            id: player.id
        }
        result.push(fame)
    })
    return result
}
