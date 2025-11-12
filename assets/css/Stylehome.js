import { StyleSheet } from "react-native";

const styleshome = StyleSheet.create({
    home: {
        flex: 1
    },
    homeimage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#120e2f8f',
    },

    hometext: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Regular',
        textShadowColor: '#45069399',
        textShadowOffset: { width: 4, height: 4 }, 
        textShadowRadius: 5,
        bottom: 60, 
    },

    homecontainer: {
        backgroundColor: 'rgba(11, 10, 10, 0.47)',
        width: 360,
        height: 550,
        borderColor: '#EEEEEE66',
        borderWidth: 2,
        borderRadius: 50,
        padding: 64,
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
        borderTopRightRadius: 25,

  },

  iconhome: {
    color: 'white',
    fontSize: 32,
  },
});

export default styleshome;