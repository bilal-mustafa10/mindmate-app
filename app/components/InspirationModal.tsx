import React from 'react';
import { Modal, View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';
import { theme } from '../constants/Theme';
import TextInput from './TextInput';

interface IInspirationModalProps {
    showModal: boolean;
    quote: string;
    setQuote: (quote: string) => void;
    onClose: () => void;
}

export const InspirationModal = ({ showModal, quote, setQuote, onClose }: IInspirationModalProps) => {
    return (
        <Modal visible={showModal} transparent={true} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidingView}
                >
                    <View style={styles.modalContainer}>
                        <Ionicons
                            name={'close-circle-outline'}
                            size={30}
                            color={'black'}
                            style={styles.closeIcon}
                            onPress={onClose}
                        />
                        <Text style={styles.inspirationText}>Create a new quote</Text>
                        <TextInput data={quote} onDataChange={setQuote} type={'medium'} inputPurpose={'inspiration'} />
                        <Button type={'large'} onPress={onClose} color={'secondary'}>
                            Save
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    closeIcon: {
        alignSelf: 'flex-end',
    },
    inspirationText: {
        ...theme.typography.bodyBold,
        marginBottom: theme.spacing.small,
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    modalBackground: {
        alignItems: 'center',
        backgroundColor: theme.colors.text,
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        alignSelf: 'center',
        backgroundColor: theme.colors.whiteBackground,
        borderRadius: 12,
        padding: '5%',
        width: '90%',
    },
});
