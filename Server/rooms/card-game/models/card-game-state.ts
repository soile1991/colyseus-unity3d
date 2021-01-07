import {ArraySchema, Context, MapSchema, Schema} from "@colyseus/schema";
import {CardKind, CardValue} from "../enums/card-enum";

const type = Context.create();


export class Card extends Schema {
  @type("int16")
  public cardKind: CardKind;
  @type("int16")
  public cardValue: CardValue;

  public key(): string {
    let cardKey = this.cardKind * 100 + this.cardValue;
    return cardKey.toString();
  }
}

export class CardGamePlayer extends Schema {

  @type("string")
  sessionId: string;

  @type([Card])
  cardsInHand: ArraySchema<Card> = new ArraySchema<Card>();

  @type({map: Card})
  cardsInHandMap: MapSchema<Card> = new MapSchema<Card>();

  removeCardsFromHand(cardsToRemove: Card[]) {
    for (let card of cardsToRemove) {
      const itemIndex = this.cardsInHand.findIndex((c) => c.cardValue === card.cardValue && c.cardKind === card.cardKind);
      this.cardsInHand.deleteAt(itemIndex);
      this.cardsInHandMap.delete(card.key());
    }
  }

}


export class CardGameState extends Schema {
  @type({map: CardGamePlayer})
  players: MapSchema<CardGamePlayer> = new MapSchema<CardGamePlayer>();

  @type([Card])
  cardsInField: ArraySchema<Card> = new ArraySchema<Card>();

  @type({map: Card})
  cardsInFieldMap: MapSchema<Card> = new MapSchema<Card>();

  getPlayerById(id: string): CardGamePlayer {
    return this.players.get(id);
  }

}
