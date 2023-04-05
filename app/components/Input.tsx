import * as React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { theme } from '../constants/Theme';

interface InputProps extends TextInputProps {
    label?: string;
    secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, ...rest }: InputProps) => {
    return (
        <TextInput
            placeholder={label}
            style={styles.input}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        alignSelf: 'stretch',
        minHeight: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: theme.spacing.medium,
        paddingVertical: theme.spacing.small,
        ...theme.typography.body,
        lineHeight: 22,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        marginBottom: theme.spacing.small,
        textAlignVertical: 'center',
    },
});
