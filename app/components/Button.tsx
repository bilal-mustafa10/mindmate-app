import * as React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { theme } from '../constants/Theme';

interface ButtonProps {
    type: 'large' | 'medium' | 'small'| 'pill';
    onPress: () => void;
    color: 'secondary' | 'tertiary' | 'error' | 'primary';
    children: React.ReactNode;
    style?: ViewStyle;
}

const styles = StyleSheet.create({
    largeButton: {
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        height: 50,
        justifyContent: 'center',
        width: '100%',
    },
    largeButtonText: {
        ...theme.typography.button,
        color: theme.colors.textSecondary,
    },
    mediumButton: {
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        height: 50,
        justifyContent: 'center',
        width: '45%',
    },
    mediumButtonText: {
        ...theme.typography.button,
    },
    smallButton: {
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        height: 35,
        justifyContent: 'center',
        width: '32%',
        margin: 5,
    },
    smallButtonText: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
    buttonTextPressed: {
        opacity: 0.6,
    },
    pillButton: {
        alignItems: 'center',
        borderRadius: 8,
        height: 25,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    pillButtonText: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
});

const buttonSizeStyles = {
    large: {
        button: styles.largeButton,
        text: styles.largeButtonText,
    },
    medium: {
        button: styles.mediumButton,
        text: styles.mediumButtonText,
    },
    small: {
        button: styles.smallButton,
        text: styles.smallButtonText,
    },
    pill: {
        button: styles.pillButton,
        text: styles.pillButtonText,
    },
};

export const Button = ({ type, onPress, color, children, style }: ButtonProps) => {
    const [isPressed, setIsPressed] = React.useState(false);

    const buttonStyle = StyleSheet.flatten([
        buttonSizeStyles[type]?.button || buttonSizeStyles.medium.button,
        { backgroundColor: theme.colors[color] },
        style,
        isPressed && styles.buttonTextPressed,
    ]);

    const textStyle = StyleSheet.flatten([
        buttonSizeStyles[type]?.text || buttonSizeStyles.medium.text,
        isPressed && styles.buttonTextPressed,
    ]);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    return (
        <Pressable
            style={buttonStyle}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Text style={textStyle}>{children}</Text>
        </Pressable>
    );
};
