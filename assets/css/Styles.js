import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    text: {
        color: 'white',
        fontSize: 64,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Bold',
    textShadowColor: '#45069399',
    textShadowOffset: { width: 4, height: 4 }, 
    textShadowRadius: 5,
    },
    viewcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderStyle: 'solid',
        flexDirection: 'column',
        gap: 70,
    },
    textocontainer: {
        fontSize: 32,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Bold'
    },
    header: {
        width: 300
    },
    forms: {
        backgroundColor: 'rgba(11, 10, 10, 0.47)',
        width: 352,
        height: 458,
        borderColor: '#EEEEEE66',
        borderWidth: 2,
        borderRadius: 50,
        padding: 32
    },
    campos: {
        fontSize: 22,
        color: 'white',
        marginTop: 32,
        fontFamily: 'Regular'
    },

    field: {
        borderWidth: 2,
        borderColor: '#EEEEEE66',
        borderWidth: 2,
        borderRadius: 12,
        padding: 8,
        color:'#eeeeeeff',
        outlineStyle: 'none',
        fontFamily: 'Regular',
    },
    button: {
        width: 100,
        backgroundColor: '#211951',
        alignSelf: 'center',
        padding: 8,
        marginTop: 32,
        borderRadius: 12,
    }
});

export default styles; 