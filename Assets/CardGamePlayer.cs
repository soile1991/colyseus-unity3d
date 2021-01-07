// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.7
// 

using Colyseus.Schema;

public partial class CardGamePlayer : Schema {
	[Type(0, "string")]
	public string sessionId = default(string);

	[Type(1, "array", typeof(ArraySchema<Card>))]
	public ArraySchema<Card> cardsInHand = new ArraySchema<Card>();

	[Type(2, "map", typeof(MapSchema<Card>))]
	public MapSchema<Card> cardsInHandMap = new MapSchema<Card>();
}

