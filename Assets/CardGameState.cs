// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.7
// 

using Colyseus.Schema;

public partial class CardGameState : Schema {
	[Type(0, "map", typeof(MapSchema<CardGamePlayer>))]
	public MapSchema<CardGamePlayer> players = new MapSchema<CardGamePlayer>();

	[Type(1, "array", typeof(ArraySchema<Card>))]
	public ArraySchema<Card> cardsInField = new ArraySchema<Card>();
}

