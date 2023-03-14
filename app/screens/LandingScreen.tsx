import {Text, View} from '../components/Themed';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';



export default function LandingScreen() {
    return (
        <View style={styles.container}>
            <View style={{height: '70%', backgroundColor: '#FAF6FF'}}>
                <View style={{height: '60%', backgroundColor: 'transparent'}}></View>
                <FastImage
                    source={require('../assets/images/logo.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{width: 200, height: 200, alignSelf: 'center'}}
                />
            </View>
            <View style={{height: '30%', backgroundColor: 'white'}}>
                <Text style={styles.title}>Welcome to MindMate</Text>
                <Text style={styles.title}>Take control of your mental health, anytime, anywhere</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

