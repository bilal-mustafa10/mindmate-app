import React, { useEffect, useRef } from 'react';
import { Text, Platform, KeyboardAvoidingView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { theme } from '../../constants/Theme';
import TextInput from '../../components/TextInput';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

interface IReflectionProps {
    onAction: () => void;
    title: string;
    reflection: string;
    setReflection: (text: string) => void;
    setTitle: (text: string) => void;
    onClose: () => void;
}

const AddReflectionScreen = ({ onAction, title, reflection, setReflection, setTitle, onClose }: IReflectionProps) => {
    const modalRef = useRef<Modalize>(null);
    const [showError, setShowError] = React.useState(false);

    const handleAddReflection = (text: string) => {
        setShowError(false);
        setReflection(text);
    };

    const handleComplete = () => {
        if (title === '' || reflection === '') {
            setShowError(true);
            return;
        }
        onAction();
    };

    useEffect(() => {
        modalRef.current?.open();
    }, []);

    return (
        <Modalize
            ref={modalRef}
            adjustToContentHeight={true}
            modalStyle={{ padding: '8%' }}
            onClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <Text style={[theme.typography.bodyBold, { marginBottom: 8 }]}>Title</Text>
                <Input
                    label={'Title'}
                    keyboardType={'default'}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Text style={[theme.typography.bodyBold, { marginTop: 16, marginBottom: 8 }]}>Write your self-reflection</Text>
                <TextInput data={reflection} onDataChange={handleAddReflection} type={'large'} />
                {showError ?
                    <Button onPress={() => { console.log('error'); }} color={'error'} type={'large'} style={{ marginVertical: '10%' }}>
                        Please fill in all fields
                    </Button>
                    :
                    <Button onPress={handleComplete} color={'secondary'} type={'medium'} style={{ marginVertical: '10%' }}>
                        Complete
                    </Button>
                }
            </KeyboardAvoidingView>
        </Modalize>
    );
};

export default AddReflectionScreen;
