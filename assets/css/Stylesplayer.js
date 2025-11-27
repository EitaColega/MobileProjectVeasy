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
		marginTop: 6,
		marginBottom: 8,
		textShadowColor: '#450693',
		textShadowOffset: { width: 4, height: 4 },
		textShadowRadius: 5
	},

	/* CONTAINER PRINCIPAL */
	homecontainer: {
		marginTop: 6,
		backgroundColor: 'rgba(11, 10, 10, 0.47)',
		width: 360,
		borderColor: '#EEEEEE66',
		borderWidth: 2,
		borderRadius: 50,
		paddingVertical: 20,
		paddingHorizontal: 10,
		alignItems: 'center',
		gap: 8
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
		fontFamily: 'Regular'
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
		width: 330,
		height: 180,
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
	}
});

export default stylesplayer;
