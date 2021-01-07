using UnityEngine;
using UnityEngine.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Colyseus;
using Colyseus.Schema;
using GameDevWare.Serialization;
using Random = System.Random;

public class ColyseusClient : MonoBehaviour {
	private CardGamePlayer myPlayer {
		get { return room.State.players[room.SessionId]; }
	}

	// UI Buttons are attached through Unity Inspector
	public Button
		m_ConnectButton,
		m_PlayCardsButton,
		m_JoinOrCreateButton,
		m_LeaveButton;


	public InputField m_EndpointField;

	public Text m_IdText,
		m_SessionIdText,
		m_cardsInHandText,
		m_cardsInFieldText,
		m_cardsInHandMapText,
		m_cardsInFieldMapText;

	private string roomName = "arrayTest";

	protected Client client;
	protected Room<CardGameState> room;

	protected Room<IndexedDictionary<string, object>> roomFossilDelta;
	protected Room<object> roomNoneSerializer;


	// Use this for initialization
	void Start() {
		/* Demo UI */
		m_ConnectButton.onClick.AddListener(ConnectToServer);
		m_JoinOrCreateButton.onClick.AddListener(JoinOrCreateRoom);
		m_LeaveButton.onClick.AddListener(LeaveRoom);
		m_PlayCardsButton.onClick.AddListener(PlayCards);
	}

	async void ConnectToServer() {
		/*
		 * Get Colyseus endpoint from InputField
		 */
		string endpoint = m_EndpointField.text;

		Debug.Log("Connecting to " + endpoint);

		/*
		 * Connect into Colyeus Server
		 */
		client = ColyseusManager.Instance.CreateClient(endpoint);
	}


	public async void JoinOrCreateRoom() {
		room = await client.JoinOrCreate<CardGameState>(roomName, new Dictionary<string, object>() { });
		RegisterRoomHandlers();
	}


	public async void PlayCards() {
		var rand = new Random();
		var cardsToPlay = this.myPlayer.cardsInHand.Items.Values.OrderBy(x => rand.Next()).Take(rand.Next(1, 4))
			.ToArray();
		await room.Send("playCards", cardsToPlay);
	}


	public void RegisterRoomHandlers() {
		m_SessionIdText.text = "sessionId: " + room.SessionId;

		PlayerPrefs.SetString("roomId", room.Id);
		PlayerPrefs.SetString("sessionId", room.SessionId);
		PlayerPrefs.Save();

		room.OnStateChange += OnStateChangeHandler;
	}


	async void LeaveRoom() {
		await room.Leave(false);
	}

	void OnStateChangeHandler(CardGameState state, bool isFirstState) {
		m_cardsInHandText.text = "Cards In hand count:" + this.myPlayer.cardsInHand.Count;
		m_cardsInFieldText.text = "Field Card count:" + state.cardsInField.Count;
		m_cardsInHandMapText.text = "Cards In hand Map count:" + this.myPlayer.cardsInHandMap.Count;
		m_cardsInFieldMapText.text = "Field Card Map count:" + state.cardsInFieldMap.Count;
	}
}