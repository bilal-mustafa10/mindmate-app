import {StyleSheet} from 'react-native';
import {Text, View} from '../../components/Themed';
import {useSelector} from 'react-redux';
import {TStore} from '../../services/redux/store';

export default function HomeScreen() {
    // get the current user from the redux store
    const auth = useSelector((state: TStore) => state.auth);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the app {auth.userId}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    separator: {
        height: 1,
        marginVertical: 30,
        width: '80%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
