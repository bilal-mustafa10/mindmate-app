import { height, styles, theme } from '../../constants/Theme';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { RootStackScreenProps } from '../../navigation/types';
import { View, Text } from 'react-native';

export default function ActivityCompleted({ navigation }: RootStackScreenProps<'ActivityCompleted'>) {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={[
                styles.mainContainer,
                styles.primaryBackground,
                { paddingTop: insets.top, flex: 1 },
                styles.paddingHorizontal,
            ]}
        >
            <View style={[styles.content, styles.primaryBackground, { height: height * 0.75 }]}>
                <FastImage source={require('../../assets/images/activity-completed.png')} style={styles.activityLogo} />
                <Text style={{ ...theme.typography.Heading, textAlign: 'center' }}>Congratulations!</Text>
                <Text style={[theme.typography.Text, { textAlign: 'center', marginVertical: '5%' }]}>
                    You have completed the activity. Thank you for taking the time to participate and engage in this
                    activity.
                </Text>
            </View>
            <View style={styles.buttonBottomStyle}>
                <Button onPress={() => navigation.navigate('Root')} color={'secondary'} type={'large'}>
                    Next
                </Button>
            </View>
        </View>
    );
}
