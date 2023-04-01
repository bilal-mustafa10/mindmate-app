import {styles, theme} from '../../constants/Theme';
import {View, Text} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moodImages} from '../../constants/Images';
import MoodComponent from '../../components/MoodComponent';
import TextInput from '../../components/TextInput';
import {Button} from '../../components/Button';
import {RealmContext} from '../../services/realm/config';

const { useRealm, useQuery } = RealmContext;
export default function MoodScreen({navigation}: RootStackScreenProps<'MoodScreen'>) {
    const insets = useSafeAreaInsets();
    const realm = useRealm();
    const [mood, setMood] = React.useState<string>('');
    const [notes, setNotes] = React.useState<string>('');
    const userData = useQuery('UserData');
    const [firstName] = React.useState<string>(userData[0]['first_name']);

    const onMoodSelect = (mood: string) => {
        setMood(mood);
    };

    const onNotesChange = (notes: string) => {
        setNotes(notes);
    };


    const handleAddUserMood = () => {
        const date = new Date();
        date.setHours(date.getHours() + 1);
        realm.write(() => {
            const userMood = {
                _id: new Realm.BSON.UUID(),
                date: date,
                mood: mood,
                notes: notes,
                is_shared: false,
            };
            realm.create('UserMood', userMood);
        });

        navigation.goBack();
    };

    return (
        <View style={[styles.container, styles.secondaryBackground, {paddingTop: insets.top * 1.5}]}>
            <Text style={[theme.typography.bodyBold, {marginBottom: '5%'}]}>How are you feeling today {firstName}?</Text>
            <MoodComponent moodImages={moodImages} onAction={onMoodSelect} mood={mood} />
            <Text style={[theme.typography.bodyBold, {marginVertical: '5%'}]}>What made you feel like this?</Text>
            <TextInput data={notes} onDataChange={onNotesChange}/>
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
                <Button onPress={handleAddUserMood} color={'secondary'} type={'medium'}>
                    Complete
                </Button>
            </View>
        </View>

    );
}
