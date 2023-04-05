import * as React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle, Dimensions } from 'react-native';
import { theme } from '../constants/Theme';

const { width } = Dimensions.get('window');

interface ButtonProps {
    type: 'large' | 'medium' | 'small' | 'pill';
    onPress: () => void;
    color: 'secondary' | 'tertiary' | 'error' | 'primary';
    children: React.ReactNode;
    style?: ViewStyle;
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        justifyContent: 'center',
        paddingHorizontal: 12,
        marginVertical: 8,
    },
    buttonText: {
        ...theme.typography.bodyBold,
        color: '#FFFFFF',
    },
    buttonTextPressed: {
        opacity: 0.6,
    },
});

const buttonSizeStyles = {
    large: {
        button: {
            height: 50,
            width: '100%',
        },
        text: {
            fontSize: 18,
        },
    },
    medium: {
        button: {
            height: 45,
            width: width * 0.40,
        },
        text: {
            fontSize: 16,
        },
    },
    small: {
        button: {
            height: 35,
            width: width * 0.28,
            margin: 5,
        },
        text: {
            fontSize: 14,
        },
    },
    pill: {
        button: {
            height: 25,
            minWidth: 60,
        },
        text: {
            fontSize: 12,
            lineHeight: 15,
        },
    },
};

export const Button = ({ type, onPress, color, children, style }: ButtonProps) => {
    const [isPressed, setIsPressed] = React.useState(false);

    const buttonStyle = StyleSheet.flatten([
        styles.button,
        buttonSizeStyles[type]?.button || buttonSizeStyles.medium.button,
        { backgroundColor: theme.colors[color] },
        style,
        isPressed && styles.buttonTextPressed,
    ]);

    const textStyle = StyleSheet.flatten([
        styles.buttonText,
        buttonSizeStyles[type]?.text || {},
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
