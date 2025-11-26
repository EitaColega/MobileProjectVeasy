import { StyleSheet } from 'react-native';

const styleshome = StyleSheet.create({
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
		fontSize: 24,
		textAlign: 'center',
		fontFamily: 'Regular',
		textShadowColor: '#450693',
		textShadowOffset: { width: 4, height: 4 },
		textShadowRadius: 5,
		bottom: 24
	},

	homecontainer: {
		backgroundColor: 'rgba(11, 10, 10, 0.47)',
		width: 360,
		height: 550,
		borderColor: '#EEEEEE66',
		borderWidth: 2,
		borderRadius: 50,
		padding: 64
	},

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

	iconhome: {
		color: 'white',
		fontSize: 32
	},
	deckercontainer1: {
		marginTop: 20,
		marginBottom: 20,
		alignItems: 'center',
		backgroundColor: 'rgba(11, 10, 10, 0.47)',
		width: 360,
		height: 200,
		borderColor: '#EEEEEE66',
		borderWidth: 2,
		borderRadius: 50,
		padding: 64,
		marginBottom: 60
	},

	textplayer: {
		color: 'white',
		fontSize: 24,
		textAlign: 'rigth',
		fontFamily: 'Regular',
		padding: 20,
		marginTop: -65,
		width: '160%'
	},

	deckercontainer2: {
		marginTop: 20,
		marginBottom: 20,
		alignItems: 'center',
		backgroundColor: 'rgba(11, 10, 10, 0.47)',
		width: 360,
		height: 200,
		borderColor: '#EEEEEE66',
		borderWidth: 2,
		borderRadius: 50,
		padding: 64,
		marginBottom: 60
	},

	SearchContainer: {
		borderColor: '#EEEEEE66',
		borderWidth: 1.5,
		borderRadius: 50,
		width: 310,
		alignItems: 'left',
		marginBottom: 24
	},

	FooterName: {
		fontFamily: 'Regular',
		color: '#FFFFFF',
		fontSize: 12
	},

	settingbullets: {
		borderColor: '#EEEEEE66',
		borderWidth: 2,
		borderRadius: 15,
		width: 140,
		margin: 8,
		alignItems: 'center'
	},

	textbullets: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
		fontFamily: 'Regular',
		textShadowColor: '#450693',
		textShadowOffset: { width: 4, height: 4 },
		textShadowRadius: 5
	},

	homecontainerOp: {
		backgroundColor: 'rgba(11, 10, 10, 0.47)',
		width: 360,
		height: 550,
		borderColor: '#EEEEEE66',
		borderWidth: 2,
		borderRadius: 50,
		paddingHorizontal: 20,
		paddingVertical: 30,

		// CORREÇÃO
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},

	userImg: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderWidth: 3,
		borderColor: 'white'
	},

	viewbullets: {
		marginTop: 20,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20
	}
});

export default styleshome;
