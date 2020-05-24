# Mon premier composant react 

Ce premier exercice a pour objectifs : 
* D'installer react sur sa machine 
* De créer un premier composant 
* D'afficher le rendu de notre composant

## Pré-requis
* Pour réaliser cet exercice vous aurez besoin :
* * D'installer nodeJS : https://nodejs.org/fr/download/
* * D'installer un éditeur de code comme visual studio code : https://code.visualstudio.com/download 

## Installation de react et creation de l'application
* Commencer par installer react : 
```
npm install --global create-react-app
```
* Créer la première application react :
```
create-react-app memory
```
- L'arborescence crée est alors celle-ci :
```
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── registerServiceWorker.js
└── yarn.lock
```
* Le point d'entrée de l'application est index.js
* Un premier composant appelé App.js a été généré
* Lancer l'application
```
npm start
```
* Que voyez-vous dans votre navigateur (s'il ne sait pas ouvert, l'application est accessible à l'url : http://localhost:3000 )

## Création de notre premier composant
* Créer un fichier Cool.js
* Ce fichier contient un composant react qui retourne le texte de votre choix 
* Appeler votre composant dans le index.js sans oublier d'importer au début du fichier le fichier Cool.js
* Sauvegarder votre travail et recharcher votre page : votre texte devrait s'afficher en dessous du header de App.js

--> Félicitation, vous avez créer et afficher votre premier composant React