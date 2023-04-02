import React, { useEffect, useRef } from 'react';
import { Text } from 'react-native';
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
    const modalizeRef = useRef<Modalize>(null);
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
        modalizeRef.current?.open();
    }, []);

    return (
        <Modalize
            ref={modalizeRef}
            adjustToContentHeight={true}
            modalStyle={{ padding: '8%' }}
            onClose={onClose}

        >
            <Text style={theme.typography.subTitle}>title</Text>
            <Input
                label={'title'}
                keyboardType={'default'}
                value={title}
                onChangeText={(text) => setTitle(text)}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <Text style={theme.typography.subTitle}>Write your self-reflection</Text>
            <TextInput data={reflection} onDataChange={handleAddReflection} type={'large'} />
            {showError ?
                <Button onPress={() => {console.log('error'); }} color={'error'} type={'large'} style={{marginVertical: '10%'}}>
                    please fill in all fields
                </Button>
                :
                <Button onPress={handleComplete} color={'secondary'} type={'medium'} style={{marginVertical: '10%'}}>
                    Complete
                </Button>
            }
        </Modalize>
    );
};


export default AddReflectionScreen;
