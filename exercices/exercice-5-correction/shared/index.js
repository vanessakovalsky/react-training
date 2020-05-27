import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import { createStore } from 'redux'
//import store from "./store/Store"
import cardsReducers from './reducers/CardsReducers'

import App from './container/App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(cardsReducers)

ReactDOM.render(
    <Provider store={store}>
    <App />   
    </Provider>,
    document.getElementById('root'))

registerServiceWorker()