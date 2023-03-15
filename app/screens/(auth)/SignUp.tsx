import {styles} from '../../constants/Theme';
import {View, Text} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';

export default function SignUp({ navigation }: RootStackScreenProps<'SignUp'>) {
    return (
        <View style={styles.container}>
            <Text>Sign Up Page :: TO-DO ::</Text>
        </View>
    );
}
