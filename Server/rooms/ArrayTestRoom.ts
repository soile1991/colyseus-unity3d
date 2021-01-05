import {Client, Room} from "colyseus";
import {CardManager} from "./card-game/helpers/cardManager";
import {Card, CardGamePlayer, CardGameState} from "./card-game/models/card-game-state";


export class ArrayTestRoom extends Room<CardGameState> {

  maxClients = 1;
  seats: Array<number> = new Array<number>();
  deck: Array<Card> = new Array<Card>();
  field: Array<Array<Card>> = new Array<Array<Card>>();


  onCreate(options: any) {
    console.log("ArrayTestRoom created.", options);

    for (let seat = 1; seat <= this.maxClients; seat++) {
      this.seats.push(seat)
    }

    this.setState(new CardGameState());


    this.onMessage("playCards", (client, cardsPlayed: Card[]) => {
      console.log(cardsPlayed)
      let cardsToPlay: Card[] = CardManager.getArrayOfCards(cardsPlayed)
      let player = this.state.players[client.sessionId];
      player.removeCardsFromHand(cardsToPlay);
      this.updateCardsInField(cardsToPlay);
    })

  }


  onJoin(client: Client) {
    console.log("onJoin", client.sessionId);
    let player = new CardGamePlayer().assign({sessionId: client.sessionId});
    this.state.players.set(client.sessionId, player)
    this.lock();
    this.initGame();
  }

  async onLeave(client: Client, consented: boolean) {


  }


  onDispose() {
    console.log("DemoRoom disposed.");
  }


  initGame() {
    this.initDeck();
    for (let playerObject of this.state.players) {
      let player = playerObject[1];
      for (let card of this.deck) {
        player.cardsInHand.push(card.clone());
      }
    }
  }

  initDeck() {
    this.deck = CardManager.getNewDeck();
    this.deck = CardManager.shuffleDeck(this.deck);
  }

  updateCardsInField(cardsToPlay: Card[]) {
    this.field.push(cardsToPlay);
    this.state.cardsInField.clear();
    for (let card of cardsToPlay) {
      this.state.cardsInField.push(card.clone());
    }
  }

}
