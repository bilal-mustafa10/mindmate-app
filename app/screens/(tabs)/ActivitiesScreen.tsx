import {Text, View} from '../../components/Themed';
import {useSelector} from 'react-redux';
import {RootState} from '../../services/redux/store';
import {styles} from '../../constants/Theme';

export default function ActivitiesScreen() {
    // get the current user from the redux store
    const auth = useSelector((state: RootState) => state.auth);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the app {auth.userId}</Text>
        </View>
    );
}

