import { styles, theme } from '../../constants/Theme';
import { Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { RootStackScreenProps } from '../../navigation/types';
import * as React from 'react';
import { moodImages } from '../../constants/Images';
import MoodComponent from '../../components/MoodComponent';
import TextInput from '../../components/TextInput';
import { Button } from '../../components/Button';
import { RealmContext } from '../../services/realm/config';
import Header from '../../components/Header';

export default function AddMoodScreen({ navigation }: RootStackScreenProps<'MoodScreen'>) {
    const realm = RealmContext.useRealm();
    const [mood, setMood] = React.useState<string>('');
    const [notes, setNotes] = React.useState<string>('');
    const userData = RealmContext.useQuery('UserData');
    const [firstName] = React.useState<string>(userData[0]['first_name']);
    const [showError, setShowError] = React.useState<boolean>(false);

    const onMoodSelect = (mood: string) => {
        setShowError(false);
        setMood(mood);
    };

    const onNotesChange = (notes: string) => {
        setNotes(notes);
    };

    const handleAddUserMood = () => {
        if (mood === '') {
            setShowError(true);
            return;
        }
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.mainContainer}
            keyboardVerticalOffset={10}
        >
            <>
                <Header
                    onHeaderLeftPress={() => {
                        navigation.goBack();
                    }}
                    title={''}
                    showBackButton={true}
                    transparent={true}
                    showBottomBorder={true}
                />

                <ScrollView
                    style={styles.secondaryBackground}
                    contentContainerStyle={styles.paddingHorizontal}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={[theme.typography.BodyBold, styles.marginBottomMedium, styles.marginTopSmall]}>
                        How are you feeling today {firstName}?
                    </Text>
                    <MoodComponent moodImages={moodImages} onAction={onMoodSelect} mood={mood} />
                    <Text style={[theme.typography.BodyBold, styles.marginTopSmall, styles.marginBottomMedium]}>
                        What made you feel like this?
                    </Text>
                    <TextInput data={notes} onDataChange={onNotesChange} type={'medium'} inputPurpose={'moodLog'} />
                    {showError ? (
                        <Button
                            onPress={() => {
                                console.log('error');
                            }}
                            color={'error'}
                            type={'large'}
                            style={styles.marginBottomLarge}
                        >
                            please select a mood
                        </Button>
                    ) : (
                        <Button
                            onPress={handleAddUserMood}
                            color={'secondary'}
                            type={'medium'}
                            style={styles.marginBottomLarge}
                        >
                            Complete
                        </Button>
                    )}
                </ScrollView>
            </>
        </KeyboardAvoidingView>
    );
}
