# Une première application en react native

Cet exercice a pour objectif
* De mettre en place l'environnement de développement pour les applications mobiles
* De développer une première application très simple
* De voir comment tester son application

## Environnement de développement
* Pour faciliter le développement d'appli avec react native on utilise Explo-cli qui s'installe avec NodeJS :
```
npm install -g expo-cli
```
* Pour créer un projet : 
```
expo init AwesomeProject
``` 
* Et voilà un projet mobile est initialisé, pour le lancer
```
npm start
```
## Une première application
* Avant de démarrer quelques différences avec ReactJS :
* * Pas de render, on utilise les composants natif de react comme le composant View
* * 
* Créer un premier composant :
```
/* @flow */

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to DemoReactApp!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

AppRegistry.registerComponent("DemoReactApp", () => App);
```

## Tester notre application
* Afin de simplifier le test, utiliser snack :
https://snack.expo.io/ 
* Copier votre code et voyez le rendu dans IOS et Android

-> Pour aller plus loin, voir la doc 
https://reactnative.dev/docs/getting-started
