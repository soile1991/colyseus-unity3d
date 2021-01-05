import {Card} from "../models/card-game-state";


export class CardManager {
  static getNewDeck(): Array<Card> {

    let cards = new Array<Card>();
    for (let kind = 0; kind < 4; kind++) {
      for (let val = 2; val <= 14; val++) {
        cards.push(new Card().assign({cardKind: kind, cardValue: val}));
      }
    }
    return cards;
  }


  static shuffleDeck(deck: Array<Card>): Array<Card> {

    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }

    return deck;
  }

  static getArrayOfCards(cards: Card[]): Card[] {

    let cardsToReturn: Array<Card> = new Array<Card>();
    for (let card of cards) {
      cardsToReturn.push(new Card().assign({cardKind: card.cardKind, cardValue: card.cardValue}))
    }
    return cardsToReturn;
  }

}
