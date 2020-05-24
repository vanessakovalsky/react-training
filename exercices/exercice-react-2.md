# Ajouter des variables à notre code avec JSX

Ce second exercice a pour objectif :
* D'écrire le début d'une application de mémory
* De travailler avec JSX pour passer des valeurs variables aux composants 

## Installation du projet 
* Récupérer le code qui est dans le dossier exercice-2-base
* Ajouter ces fichiers dans le dossier src de votre application (en remplaçant index.js, App.js et App.css ou en récupérant le code de ces fichiers et en le rajoutant au code existant)

## Modifier le composant carte
* Modifier le composant Card pour faire les actions suivantes :
* *  Ajouter deux props : card et feedback à notre composant
* *  Si la valeur de la prop feedback est à hidden on affiche le contenu de la constante HIDDEN_SYMBOL
* * Sinon on affiche la carte (contenu dans la prop card)

## Ajouter le nombre de tentative effectuée
* Modifier le composant GuessCount : 
* * Ajouter une prop guesses qui contiendra le nombre de tentative
* * Afficher dans le rendu ce nombre de tentatives

## Afficher les cartes et le compteur
* Dans le composant App :
* * Afficher le compteur de tentative en définissant sa valeur à 0
* * Ajouter 6 cartes en dur avec les valeurs suivantes :
```
        <Card card="😀" feedback="hidden" />
        <Card card="🎉" feedback="justMatched" />
        <Card card="💖" feedback="justMismatched" />
        <Card card="🎩" feedback="visible" />
        <Card card="🐶" feedback="hidden" />
        <Card card="🐱" feedback="justMatched" />
```

--> Vous avez les bases d'un jeu de mémory, l'exercice suivant nous permettra de le rendre interractif