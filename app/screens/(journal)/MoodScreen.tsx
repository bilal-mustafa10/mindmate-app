import {styles} from '../../constants/Theme';
import {View, Text} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moodImages} from '../../constants/images';
import MoodComponent from '../../components/MoodComponent';
import TextInput from '../../components/TextInput';
import {Button} from '../../components/Button';

export default function MoodScreen({navigation}: RootStackScreenProps<'MoodScreen'>) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, styles.secondaryBackground, {paddingTop: insets.top * 1.5}]}>
            <Text style={styles.subTitle}>How are you feeling today [Student Name]?</Text>
            <MoodComponent moodImages={moodImages} />
            <Text style={styles.subTitle}>What made you feel like this?</Text>
            <TextInput />
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginBottom: '10%',
                    backgroundColor: 'transparent'
                }}
            >
                {/*<Button onPress={() => navigation.navigate('Root')} color={'tertiary'} type={'medium'}>
                    Share with friends
                </Button>*/}
                <Button onPress={() => navigation.navigate('Root')} color={'secondary'} type={'medium'}>
                    Complete
                </Button>
            </View>
        </View>

    );
}
