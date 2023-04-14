import React from 'react';
import { Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { RootStackScreenProps } from '../../navigation/types';
import { RealmContext } from '../../services/realm/config';
import { styles, theme } from '../../constants/Theme';
import Header from '../../components/Header';
import { Input } from '../../components/Input';
import TextInput from '../../components/TextInput';
import { Button } from '../../components/Button';

// const predefinedTags = ['Study', 'Social', 'Health', 'Relationship', 'Career', 'Hobbies', 'Finance', 'Emotional'];
export default function AddReflectionScreen({ navigation }: RootStackScreenProps<'AddReflectionScreen'>) {
    const realm = RealmContext.useRealm();
    const [showError, setShowError] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [reflection, setReflection] = React.useState('');

    const handleAddReflection = (text: string) => {
        setShowError(false);
        setReflection(text);
    };

    const handleComplete = () => {
        if (title === '' || reflection === '') {
            setShowError(true);
            return;
        }

        const date = new Date();
        date.setHours(date.getHours());

        realm.write(() => {
            realm.create('UserReflection', {
                _id: new Realm.BSON.UUID(),
                title: title,
                notes: reflection,
                date: date,
                is_shared: false,
                likes: 0,
            });
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
                    showAvatar={false}
                    onHeaderLeftPress={() => {
                        navigation.goBack();
                    }}
                    title={'Add Reflection'}
                    showBackButton={true}
                />

                <ScrollView
                    contentContainerStyle={[styles.paddingHorizontal, styles.paddingTop]}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={[theme.typography.bodyBold, styles.marginBottomSmall]}>Title</Text>
                    <Input
                        label={'Title'}
                        keyboardType={'default'}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Text style={[theme.typography.bodyBold, styles.marginBottomSmall, styles.marginTopMedium]}>
                        Write your self-reflection
                    </Text>
                    <TextInput
                        data={reflection}
                        onDataChange={handleAddReflection}
                        type={'large'}
                        inputPurpose={'selfReflection'}
                    />

                    {showError ? (
                        <Button
                            onPress={() => {
                                console.log('error');
                            }}
                            color={'error'}
                            type={'large'}
                            style={styles.marginBottomLarge}
                        >
                            Please fill in all fields
                        </Button>
                    ) : (
                        <Button
                            onPress={handleComplete}
                            color={'secondary'}
                            type={'large'}
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
