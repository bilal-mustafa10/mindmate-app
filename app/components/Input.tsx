import * as React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { theme } from '../constants/Theme';

interface InputProps extends TextInputProps {
    label?: string;
    secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, ...rest }: InputProps) => {
    return <TextInput placeholder={label} style={styles.input} {...rest} />;
};

const styles = StyleSheet.create({
    input: {
        alignSelf: 'stretch',
        backgroundColor: theme.colors.whiteBackground,
        borderRadius: 15,
        minHeight: 60,
        paddingHorizontal: theme.spacing.medium,
        paddingVertical: theme.spacing.small,
        ...theme.typography.Text,
        borderColor: theme.colors.borderColor,
        borderWidth: 1,
        marginBottom: theme.spacing.small,
        textAlignVertical: 'center',
    },
});
