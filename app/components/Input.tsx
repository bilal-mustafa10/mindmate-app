import * as React from 'react';
import { StyleSheet, TextInput, Text, TextInputProps } from 'react-native';
import { theme } from '../constants/Theme';

interface InputProps extends TextInputProps {
    label?: string;
    secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, secureTextEntry, ...rest }: InputProps) => {
    return (
        <>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.input}
                secureTextEntry={secureTextEntry}
                {...rest}
            />
        </>
    );
};

const styles = StyleSheet.create({
    label: {
        ...theme.typography.h3,
        marginBottom: '2%'
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 14,
        ...theme.typography.footnote,
        color: theme.colors.text,
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        marginBottom: '5%'
    }
});