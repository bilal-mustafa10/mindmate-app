import * as React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { theme } from '../constants/Theme';

interface InputProps extends TextInputProps {
    label?: string;
    secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({
    label,
    secureTextEntry,
    ...rest
}: InputProps) => {
    return (
        <TextInput
            placeholder={label}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 16,
        ...theme.typography.body1,
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        marginBottom: '5%'
    }
});
