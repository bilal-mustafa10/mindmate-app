import {Text, View} from '../../components/Themed';
import {height, styles, theme} from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../components/Button';
import {RootStackScreenProps} from '../../navigation/types';

export default function ActivityCompleted({ navigation }: RootStackScreenProps<'ActivityCompleted'>) {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <View style={[styles.content, styles.primaryBackground, { height: height * 0.65 }]}>
                <FastImage source={require('../../assets/images/activity-completed.png')} style={styles.activityLogo} />
                <Text style={theme.typography.title}>Congratulations!</Text>
                <Text style={[theme.typography.body, {textAlign:'center', marginVertical:'10%'}]}>You have successfully completed the activity. Thank you for taking the time to participate and engage in this activity.</Text>
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 10,
                    alignSelf: 'center',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: '15%',
                    backgroundColor: 'transparent'
                }}
            >
                <Button onPress={() => navigation.navigate('Root')} color={'tertiary'} type={'medium'}>
                    Share with friends
                </Button>
                <Button onPress={() => navigation.navigate('Root')} color={'secondary'} type={'medium'}>
                    Next
                </Button>
            </View>
        </View>
    );
}
