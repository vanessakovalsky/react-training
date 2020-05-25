# Rendre notre memory dynamique

Ce troisième exercice a pour objectif :
* D'ajouter de l'interractivité avec les évènements
* D'ajouter la liste des gagnants
* De rendre variable la génération des cartes


## Ajouter des évènements sur nos cartes 
* Dans le composant Card, ajouter un évènement qui réagit au click
* A l'appel du composant Card dans App ajouter l'évènement onclick

## Ajouter une liste des gagnants
* Récupérer dans exercice-3-base les fichiers HallOfFame.css et HallOfFame.js et ajouter les dans votre dossier src
* Ajouter loadshuffle aux dépendances
```
npm install --save lodash.shuffle
```
* Ajouter dans le App.js la méthode de génération de carte suivante :
```
  cards = this.generateCards()

  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }
```
* Dans le return de App.js utiliser les cartes générées à la place de la liste de carte en dur
```
return (
  <div className="memory">
    <GuessCount guesses={0} />
    {this.cards.map((card, index) => (
      <Card
        card={card}
        feedback="visible"
        key={index}
        onClick={this.handleCardClick}
      />
    ))}
    {won && <p>GAGNÉ !</p>}
  </div>
)
```
* On ajoute le tableau de gagnant en modifiant HallOfFame.js
```
  entries.map(({ date, guesses, id, player }) => (
    <tr key={id}>
      <td className="date">{date}</td>
      <td className="guesses">{guesses}</td>
      <td className="player">{player}</td>
    </tr>
  ))
```
* Ajouter dans App.js l'appel à ce tableau

## Rendre notre jeu interactif avec l'état local (state)
* Dans le fichier App.js on commence par remplacer le champ temporaire cards par un état :
```
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    matchedCardIndices: [],
  }
```
* Dans le même fichier on change ensuite le rendu :
```
  const { cards, guesses, matchedCardIndices } = this.state
  const won = matchedCardIndices.length === cards.length
  return (
    <div className="memory">
      <GuessCount guesses={guesses} />
      {cards.map((card, index) => (
```
* On va maintenant ajouter une fonction qui montre les cartes cachées au départ dans App.js :
```
getFeedbackForCard(index) {
  const { currentPair, matchedCardIndices } = this.state
  const indexMatched = matchedCardIndices.includes(index)

  if (currentPair.length < 2) {
    return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
  }

  if (currentPair.includes(index)) {
    return indexMatched ? 'justMatched' : 'justMismatched'
  }

  return indexMatched ? 'visible' : 'hidden'
}
```
* On appelle cette fonction dans le render sur le feedback :
```
{
  cards.map((card, index) => (
    <Card
      card={card}
      feedback={this.getFeedbackForCard(index)}
      key={index}
      onClick={this.handleCardClick}
    />
  ))
}
```
* On modifie ensuite la fonction appelé lors du clic pour faire changer l'état en cas de clic :
```
 handleCardClick = index => {
    const { currentPair } = this.state

    if (currentPair.length === 2) {
      return
    }

    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] })
      return
    }

    this.handleNewPairClosedBy(index)
  }
```
* Dans le rendu du App.js on rajoute l'index qui sert de clé pour notre fonction précédente :
```
{
  cards.map((card, index) => (
    <Card
      card={card}
      feedback={this.getFeedbackForCard(index)}
      index={index}
      key={index}
      onClick={this.handleCardClick}
    />
  ))
}
```
* On ajoute la méthode métier qui permet de vérifier la paire cliquer :
```
  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state

    const newPair = [currentPair[0], index]
    const newGuesses = guesses + 1
    const matched = cards[newPair[0]] === cards[newPair[1]]
    this.setState({ currentPair: newPair, guesses: newGuesses })
    if (matched) {
      this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
  }
```
* N'oublier pas d'ajouter la constante VISUAL_PAUSE_MSECS 
* Penser également à ajouter l'index sur le onclick de la carte dans Card.js