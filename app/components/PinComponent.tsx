import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../constants/Theme';
import { Button } from './Button';

interface PinComponentProps {
    onKeyPress: (value: string) => void;
    clearLastDigit: () => void;
    setupMode?: boolean;
    onComplete?: () => void;
    error?: boolean;
}

export const PinComponent: React.FC<PinComponentProps> = ({
    onKeyPress,
    clearLastDigit,
    setupMode = false,
    onComplete,
    error,
}) => {
    const [pin, setPin] = useState(['', '', '', '']);

    useEffect(() => {
        if (error === true) {
            setPin(['', '', '', '']);
        }
    }, [error]);

    useEffect(() => {
        if (!setupMode && onComplete && pin.indexOf('') === -1) {
            onComplete();
        }
    }, [pin]);

    const onKeyPressHandler = (value: string) => {
        error = false;
        const updatedPin = [...pin];
        const emptyIndex = updatedPin.indexOf('');

        if (emptyIndex >= 0) {
            updatedPin[emptyIndex] = value;
            setPin(updatedPin);
        }

        onKeyPress(value);
    };

    const onBackHandler = () => {
        const updatedPin = [...pin];
        const emptyIndex = updatedPin.indexOf('');

        if (emptyIndex > 0) {
            updatedPin[emptyIndex - 1] = '';
        } else if (emptyIndex === -1) {
            updatedPin[updatedPin.length - 1] = '';
        }

        setPin(updatedPin);
        clearLastDigit();
    };

    const renderKeypad = () => {
        const keypad = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['', '0', '⌫'],
        ];

        return (
            <View style={styles.keypad}>
                {keypad.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.keypadRow}>
                        {row.map((key, keyIndex) => (
                            <TouchableOpacity
                                key={keyIndex}
                                style={[styles.keypadButton, key === '⌫' || key === 'C' ? styles.actionKey : null]}
                                onPress={() => {
                                    if (key === '⌫') {
                                        onBackHandler();
                                    } else {
                                        onKeyPressHandler(key);
                                    }
                                }}
                            >
                                <Text style={styles.keypadButtonText}>{key}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={[theme.typography.SubHeading, error ? styles.marginBottomSmall : styles.marginBottomMedium]}>
                {setupMode ? 'Set up your pin' : 'Sign in to your account'}
            </Text>
            {error && <Text style={styles.errorText}>Incorrect pin</Text>}
            <View style={styles.pinContainer}>
                {pin.map((item, index) => (
                    <View key={index} style={styles.pinDigit}>
                        <Text style={styles.pinDigitText}>{item ? '•' : ''}</Text>
                    </View>
                ))}
            </View>
            {renderKeypad()}

            {setupMode && pin.indexOf('') === -1 && (
                <Button type={'large'} onPress={onComplete} color={'primary'}>
                    Complete
                </Button>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    actionKey: {
        backgroundColor: theme.colors.secondaryBackground,
        borderRadius: 15,
    },
    container: {
        paddingHorizontal: 20,
    },
    errorText: {
        ...theme.typography.Error,
        marginBottom: 20,
        textAlign: 'center',
    },
    keypad: {
        alignSelf: 'center',
        marginTop: 30,
    },
    keypadButton: {
        alignItems: 'center',
        height: 75,
        justifyContent: 'center',
        marginHorizontal: 20,
        width: 75,
    },
    keypadButtonText: {
        ...theme.typography.BodyMedium,
        fontSize: 24,
    },
    keypadRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
    marginBottomMedium: {
        marginBottom: 50,
    },
    marginBottomSmall: {
        marginBottom: 20,
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    pinDigit: {
        alignItems: 'center',
        backgroundColor: theme.colors.whiteBackground,
        borderColor: theme.colors.borderColor,
        borderRadius: 15,
        borderWidth: 1.2,
        height: 60,
        justifyContent: 'center',
        marginHorizontal: 10,
        width: 60,
    },
    pinDigitText: {
        ...theme.typography.TextSemiBold,
        fontSize: 40,
    },
});
