import React, { useEffect, useRef } from 'react';
import { Text, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { styles, theme } from '../../constants/Theme';
import TextInput from '../../components/TextInput';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { RealmContext } from '../../services/realm/config';

const AddReflectionScreen = ({ onClose }) => {
    const realm = RealmContext.useRealm();
    const modalRef = useRef<Modalize>(null);
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
        date.setHours(date.getHours() + 1);

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

        onClose();
    };

    useEffect(() => {
        modalRef.current?.open();
    }, []);

    return (
        <Modalize
            ref={modalRef}
            adjustToContentHeight={true}
            modalStyle={[styles.paddingMedium, styles.primaryBackground]}
            onClose={onClose}
        >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
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
            </KeyboardAvoidingView>
        </Modalize>
    );
};

export default AddReflectionScreen;
