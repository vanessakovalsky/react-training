# Rendre notre application isomorphique

Ce cinquème exercice a pour objectifs :
* De rendre notre application isomorphique, pour qu'elle puisse également être executée sur un serveur
* D'utiliser des routes pour afficher le HallOfFame dans une page séparée

## Rendre notre application isomorphique
* Commençons par restructure nos fichiers :
```
├── build
|  └── main.bundle.js
├── client
|  └── main.js
├── iso-middleware
|  └── renderRoute.js
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
import Home from './components/App';
import HallOfFame from './components/HallOfFame';
import NotFound from './components/NotFound';
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
      {
        path: '*',
        restricted: false,
        component: NotFound
      }
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
  
// Set up ======================================================================
// get all the tools we need
import express from 'express';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import renderRouterMiddleware from '../iso-middleware/renderRoute';

require('dotenv').config();

// Configuration ===============================================================
const app = express();
app.set('port', process.env.PORT || 8080);
app.use(logger('short'));

// Request Handlers
const buildPath = path.join(__dirname, '../', 'build');

app.use('/', express.static(buildPath));

app.get('*', renderRouterMiddleware);

// launch ======================================================================
// Starts the Express server on port 3001 and logs that it has started
http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server started at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

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
  presets: ['env', 'react-app']
});

require('./server.js');
```

## Mise en place du client et de la gestion des routes partagées
* Le dossier client contient le fichier main.js qui initialise l'application côté client :
```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';

const renderRouter = Component => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <Component />
    </BrowserRouter>, document.getElementById('root')
  );
};

renderRouter(App);
```
* Il reste le fichier qui fait le point entre les routes du côté serveur et client iso-middleware/renderRoute.js : 
```
import React from 'react';
// import chalk from 'chalk';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import routes from '../shared/routes';
import HTML from '../shared/components/HTML';
import App from '../shared/App';

export default function renderRoute(req, res) {
  const branch = matchRoutes(routes, req.url);
  const promises = [];

  branch.forEach(({ route, match }) => {
    if (route.loadData) {
      promises.push(route.loadData(match));
    }
  });

  Promise.all(promises).then(data => {
    // data will be an array[] of datas returned by each promises.
    // // console.log(data)

    const context = data.reduce((context, data) => Object.assign(context, data), {});

    const router = <StaticRouter location={req.url} context={context}><App /></StaticRouter>;

    const app = renderToString(router);

    const html = renderToString(<HTML html={app} />);

    // console.log(chalk.green(`<!DOCTYPE html>${html}`));

    return res.send(`<!DOCTYPE html>${html}`);
  });
}
```

## Gestion du build et du lancement :

* Dans le fichier package.json, il est nécessaire de changer les commandes pour lancer node et plus seulement react, remplacer la partie script par 
```
    "build:prod": "./node_modules/.bin/webpack --mode production",
    "build:dev": "./node_modules/.bin/webpack --mode development",
    "prestart": "npm run build:dev",
    "start": "node server/run.js",
    "lint": "./node_modules/.bin/eslint server client shared iso-middleware --ext .js,.jsx --fix"
```
* Comme nous n'utilisons plus react-script pour le lancement il faut ajouter le fichier webpack.config.js a la racine avec ce contenu :
```
process.env.NODE_ENV = 'development';
const path = require('path');

module.exports = {
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.es6'],
  }
};
```
* Ainsi que le fichier de config pour babel .babelrc
```
{
  "presets": [
    "env",
    "stage-2",
    "react"
  ],
  "plugins": [
    "transform-runtime",
    "transform-es2015-destructuring",
    "transform-es2015-parameters",
    "transform-object-rest-spread"
  ]
}
```
- Lancer l'application
```
npm start 
```

-> Félicitations, l'application est maintenant isomorphique et s'éxecute à la fois côté serveur pour un premier rendu rapide, et des possibilités de SEO, mais aussi côté client en SPA avec les avantages associés

