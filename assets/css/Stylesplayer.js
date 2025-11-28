import { StyleSheet } from 'react-native';

const stylesplayer = StyleSheet.create({
	home: {
		flex: 1
	},

	homeimage: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%'
	},

	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: '#120e2f8f'
	},

	hometext: {
		color: 'white',
		fontSize: 28,
		textAlign: 'center',
		fontFamily: 'Regular',
		textShadowColor: '#450693',
		textShadowOffset: { width: 4, height: 4 },
		textShadowRadius: 5
	},

	/* CONTAINER PRINCIPAL */
	homecontainer: {
		backgroundColor: 'rgba(11, 10, 10, 0.47)',
		width: 360,
		borderColor: '#EEEEEE66',
		borderWidth: 2,
		borderRadius: 50,
		paddingVertical: 20,
		paddingHorizontal: 10,
		alignItems: 'center',

	},

	/* INFO DO PLAYER */
	infoCenter: {
		width: '100%',
		alignItems: 'center', // mantém nome e clã centralizados
		marginTop: 8,
		marginBottom: 6
	},

	/* container específico para os troféus (alinhado à esquerda) */
	statsContainer: {
		width: '100%',
		paddingLeft: 24, // distância da borda esquerda
		paddingRight: 20,
		marginTop: 6,
		alignItems: 'flex-start', // garante alinhamento à esquerda
		justifyContent: 'flex-start'
	},

	/* estilo dos textos de troféus */
	top: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Regular',
		textAlign: 'left',
		marginBottom: 6
	},

	name: {
		color: 'white',
		fontSize: 26,
		fontFamily: 'Regular',
		marginTop: -18,
		marginBottom: 18, 
	},

	info: {
		color: 'white',
		fontSize: 20,
		fontFamily: 'Regular'
	},

	top: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Regular',
		marginTop: 4,
		textAlign: 'left', // garante alinhamento
		width: '100%'
	},

	/* ESTATÍSTICAS (ESQUERDA) */
	statsBox: {
		width: '100%',
		paddingHorizontal: 20,
		marginTop: 4,
		gap: 4,
		alignSelf: 'flex-start'
	},

	statTitle: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Regular'
	},

	statValue: {
		color: '#d2bfff',
		fontSize: 20,
		marginBottom: 4,
		fontFamily: 'Regular'
	},

	/* TÍTULO DE SEÇÃO - ESQUERDA */
	sectionTitle: {
		color: 'white',
		fontSize: 22,
		fontFamily: 'Regular',
		marginTop: 20,
		alignSelf: 'flex-start',
		marginLeft: 20
	},

	/* BOX DO DECK */
	deckBox: {
		marginTop: 5,
		backgroundColor: 'rgba(11, 10, 10, 0.47)',
		width: 320,
		height: 150,
		borderColor: '#EEEEEE66',
		borderWidth: 2,
		borderRadius: 30
	},

	/* BARRA INFERIOR */
	bottomBar: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 100,
		backgroundColor: 'rgba(11, 10, 10, 0.47)',
		borderTopWidth: 2,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderColor: '#EEEEEE66',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25
	},

	userImg: {
		width: 150,
		height: 150,
		borderRadius: 80,
		borderWidth: 3,
		borderColor: 'white'
	},

	cardRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	cardContainer: {
		width: '23%', // 4 por linha com espaçamento
		alignItems: 'center',
	},
	cardImage: {
		width: 68,
		height: 68,
		borderRadius: 8,
		backgroundColor: '#222',
	},
	cardName: {
		marginTop: 6,
		color: 'white',
		fontSize: 12,
		textAlign: 'center',
	},

	cardBox: {
  width: 70,
  height: 60,
  borderRadius: 12,
  overflow: "hidden",
  backgroundColor: "rgba(255,255,255,0.05)",
},

cardImageNew: {
  width: "100%",
  height: "100%",
  borderRadius: 12,
},

cardPlaceholder: {
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 12,
  backgroundColor: "rgba(255,255,255,0.05)",
},

deckWrapper: {
  marginTop: 8,
  paddingVertical: 18,
  paddingHorizontal: 12,
  width: "100%",
  alignSelf: "center",
  backgroundColor: "rgba(0,0,0,0.25)",
  borderRadius: 20,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.1)",
},

deckTitle: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 14,
},


});

export default stylesplayer;
