import { Text, View } from '../../components/Themed';
import { height, styles, theme } from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { RootStackScreenProps } from '../../navigation/types';

export default function ActivityCompleted({ navigation }: RootStackScreenProps<'ActivityCompleted'>) {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, styles.primaryBackground, { paddingTop: insets.top, flex: 1 }]}>
            <View style={[styles.content, styles.primaryBackground, { height: height * 0.65 }]}>
                <FastImage source={require('../../assets/images/activity-completed.png')} style={styles.activityLogo} />
                <Text style={{ ...theme.typography.headingBold, textAlign: 'center' }}>Congratulations!</Text>
                <Text style={[theme.typography.bodyMedium, { textAlign: 'center', marginVertical: '10%' }]}>
                    You have successfully completed the activity. Thank you for taking the time to participate and
                    engage in this activity.
                </Text>
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 30,
                    alignSelf: 'center',
                    width: '100%',
                    backgroundColor: 'transparent',
                }}
            >
                <Button onPress={() => navigation.navigate('Root')} color={'secondary'} type={'large'}>
                    Next
                </Button>
            </View>
        </View>
    );
}
