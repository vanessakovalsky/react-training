// get all the tools we need
import express from 'express';
import logger from 'morgan';
import App from '../shared/App';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import cardsReducers from '../shared/reducers/CardsReducers';
import { StaticRouter } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server'

require('dotenv').config();

// Configuration ===============================================================
const app = express();
app.set('port', process.env.PORT || 8080);
app.use(logger('short'));
app.set('view engine', 'ejs');
app.use('/static', express.static('build'));

// Request handler
app.get('*', (req, res) => {
  const context = {}
  const store = createStore(cardsReducers)
  const preloadedState = store.getState()
  res.render('layout',{
    content: ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
     </Provider>
    ),
    state: JSON.stringify(preloadedState),
  })
})

// Lauch
app.listen(3000,() => { console.log('App démarré sur le port 3000')})

module.exports = app; 