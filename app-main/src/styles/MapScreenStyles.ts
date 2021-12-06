import {Dimensions, StyleSheet} from 'react-native'

const containerHeight = Dimensions.get('window').height;
const containerWidth = Dimensions.get('window').width;
const infoHeight = Dimensions.get('window').height * 0.5
const infoWidth = Dimensions.get('window').width * 0.85

export const mapScreenStyles = StyleSheet.create({
    container: {
        height: containerHeight,
        width: containerWidth
    },
    image: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    mapInfo: {
        backgroundColor: 'white',
        width: infoWidth,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 15
    },
    operationalHours: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignSelf: 'flex-start',
        marginTop: 5,
        marginLeft: 5
    },
    times: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
        padding: 5
    },
    map: {
        marginBottom: containerHeight * 0.1,
    }
});
