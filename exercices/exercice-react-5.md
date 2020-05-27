# Rendre notre application isomorphique

Ce cinquème exercice a pour objectifs :
* De rendre notre application isomorphique, pour qu'elle puisse également être executée sur un serveur
* D'utiliser des routes pour afficher le HallOfFame dans une page séparée

## Rendre notre application isomorphique
* Commençons par restructure nos fichiers :
```
├── client
|  └── main.js
├── package.json
├── .babelrc
├── .env
├── server
|  ├── run.js
|  └── server.js
├── shared
|  ├── App.js
|  ├── components
|  |  ├── About.js
|  |  ├── HTML.js
|  |  ├── TopNav.js
|  |  ├── Home.js
|  |  ├── Main.js
|  |  └── NotFound.js
|  └── routes.js
└── webpack.config.js
```
* Le dossier Shared va contenir ce que containait le dossier src jusqu'à présent (vous pouvez renommer ce dossier directement)

## Ajouter les routes
* Installer le composant de route 
```
npm install react-router-dom
```
* Ajouter un composant de navigation (TopNav)
```
import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <nav>
    <div className="nav-wrapper">
      <a href="/" className="brand-logo">Demo</a>
      <ul id="nav-mobile" className="right">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/hall-of-fame">Hall of fame</Link></li>
      </ul>
    </div>
  </nav>
);
```
* Ajouter ensuite un fichier routes.js
```
import App from './components/App';
import HallOfFame from './components/HallOfFame';
import Root from './components/Root';

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: App
      },
      {
        path: '/hall-of-fame',
        component: HallOfFame
      },
    ]
  }
];

export default routes;
```
* On ajoute également le composant route qui appelle nos routes :
```
import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';

const Root = ({ route }) => (
  <Switch>
    {renderRoutes(routes)}
  </Switch>
)

export default Root;
```

# Mise en place du côté serveur
* Commencer par installer les paquets nécessaires :
```
npm install http, path, express, morgan
```
* Dans le dossier server, le fichier server.js initialise express, le framework de NodeJS et appelle le rendu des composants partagés :
```
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
```
* Le fichier server permet d'intialiser la page côté server
* Le fichier run.js lance babel pour transpiler le code
```
// Include Babel
// it will parse all code that comes after it.
// (Not recommended for production use).

process.env.NODE_ENV = 'development';
require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react']
});
require.extensions['.css'] = () => {
  return;
};

require('./server.js');
```
* Ajout de la vue côté Express avec EJS, dans le fichier views/layout.ejs :
```
<!doctype html>
    <html>
      <head>
        <title>Memory isomorphic</title>
      </head>
      <body>
        <div id="root"><%- content %></div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/recipes/server-rendering/#security-considerations
          window.__PRELOADED_STATE__ = <%- state %>
        </script>
        <script src="/static/main.bundle.js"></script>
      </body>
    </html>
```
## Mise en place du client et de la gestion des routes partagées
* Le dossier client contient le fichier main.js qui initialise l'application côté client :
```
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
```

## Gestion du build et du lancement :

* Dans le fichier package.json, remplacer le contenu existant pour avoir l'ensemble du contenu nécessaire
```
    {
  "name": "test",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build:prod": "./node_modules/.bin/webpack --mode production",
    "build:dev": "./node_modules/.bin/webpack --mode development",
    "prestart": "npm run build:dev",
    "start": "node --experimental-modules server/run.js",
    "lint": "./node_modules/.bin/eslint server client shared --ext .js,.jsx --fix"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "dependencies": {
    "babel-polyfill": "^6.26.0",
    "chalk": "^2.4.1",
    "css-loader": "^3.5.3",
    "dotenv": "^5.0.0",
    "ejs": "^3.1.3",
    "express": "^4.16.4",
    "fs": "0.0.1-security",
    "isomorphic-fetch": "^2.2.1",
    "lodash.shuffle": "^4.2.0",
    "morgan": "^1.9.1",
    "react": "^16.6.3",
    "react-dom": "^16.6.3",
    "react-redux": "^7.2.0",
    "react-router-config": "^1.0.0-beta.4",
    "react-router-dom": "^4.3.1",
    "redux": "^4.0.5"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-eslint": "^8.2.6",
    "babel-loader": "^7.1.5",
    "babel-plugin-transform-es2015-destructuring": "^6.23.0",
    "babel-plugin-transform-es2015-parameters": "^6.24.1",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-react-app": "^3.1.2",
    "babel-preset-stage-2": "^6.24.1",
    "babel-register": "^6.26.0",
    "eslint": "^4.19.1",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-config-google": "^0.9.1",
    "eslint-plugin-babel": "^4.1.2",
    "eslint-plugin-import": "^2.14.0",
    "eslint-plugin-jsx-a11y": "^6.1.2",
    "eslint-plugin-react": "^7.11.1",
    "eslint-plugin-react-native": "^3.5.0",
    "style-loader": "^0.20.3",
    "webpack": "^4.26.1",
    "webpack-cli": "^3.1.2"
  }
}
```
* Comme nous n'utilisons plus react-script pour le lancement il faut ajouter le fichier webpack.config.js a la racine avec ce contenu :
```
const path = require('path');module.exports = {
  entry: {
      main: './client/main.js'
  },
  output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
      rules: [
          { 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader"
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
      ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.es6'],
  }
}
```
* Ainsi que le fichier de config pour babel .babelrc
```
{
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  }
```
* Installer les dépendances
```
npm install 
```
* Lancer l'application
```
npm start 
```

-> Félicitations, l'application est maintenant isomorphique et s'éxecute à la fois côté serveur pour un premier rendu rapide, et des possibilités de SEO, mais aussi côté client en SPA avec les avantages associés

