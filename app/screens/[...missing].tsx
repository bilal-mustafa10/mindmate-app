import {StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';

export default function NotFoundScreen() {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>This screen does not exist.</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        color: '#2e78b7',
        fontSize: 14,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
