// components/AcknowledgmentToast.tsx

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { theme } from '../constants/Theme';

interface Props {
    message: string;
    visible: boolean;
    duration?: number;
    onDismiss?: () => void;
    bgColor: string;
}

export const AcknowledgmentToast: React.FC<Props> = ({ message, visible, duration = 1000, onDismiss, bgColor }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(() => {
                        if (onDismiss) {
                            onDismiss();
                        }
                    });
                }, duration);
            });
        }
    }, [duration, onDismiss, opacity, visible]);

    if (!visible) {
        return null;
    }

    return (
        <Animated.View style={[styles.toastContainer, { opacity, backgroundColor: bgColor }]}>
            <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '90%',
    },
    toastText: {
        ...theme.typography.BodyBold,
        color: theme.colors.whiteBackground,
        textAlign: 'center',
    },
});
