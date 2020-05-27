import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import cardsReducers from '../shared/reducers/CardsReducers';

const initialState = window.__PRELOADED_STATE__ || {};
const store = createStore(cardsReducers, initialState)


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);