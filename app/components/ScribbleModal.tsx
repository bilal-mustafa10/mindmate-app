// ScribbleModal.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Scribble from './Scribble';
import {Button} from './Button';

interface ScribbleModalProps {
    onCancel: () => void;
    onSave: (quote: string) => void;
}

const ScribbleModal = ({ onCancel, onSave }: ScribbleModalProps) => {
    const [quote, setQuote] = useState<string>('');

    const handleSave = () => {
        onSave(quote);
    };

    return (
        <Modal isVisible={true} style={styles.modal}>
            <View style={styles.modalContent}>
                <View style={styles.buttonWrapper}>
                    <Button type={'pill'} onPress={onCancel} color={'error'}>Cancel</Button>
                    <Button type={'pill'} onPress={handleSave} color={'secondary'}>Save</Button>
                </View>
                <Scribble onQuoteChange={setQuote} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '95%',
        height: '85%',
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
});

export default ScribbleModal;
