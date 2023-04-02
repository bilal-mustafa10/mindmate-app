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
}

const AddReflectionScreen = ({ onAction, title, reflection, setReflection, setTitle }: IReflectionProps) => {
    const modalizeRef = useRef<Modalize>(null);


    useEffect(() => {
        modalizeRef.current?.open();
    }, []);

    return (
        <Modalize
            ref={modalizeRef}
            adjustToContentHeight={true}
            modalStyle={{ padding: '8%' }}
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
            <TextInput data={reflection} onDataChange={setReflection} type={'large'} />
            <Button type={'medium'} onPress={onAction} color={'secondary'} style={{marginVertical: '10%'}}>Complete</Button>
        </Modalize>
    );
};


export default AddReflectionScreen;
