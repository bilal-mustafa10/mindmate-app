import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/Theme';

interface WelcomeTextProps {
    title: string;
    description: string;
}

const WelcomeText: React.FC<WelcomeTextProps> = ({ title, description }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{title}</Text>
            <Text style={styles.descriptionStyle}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: '5%',
    },
    descriptionStyle: {
        ...theme.typography.subtitle,
        textAlign: 'center',
    },
    textStyle: {
        ...theme.typography.headingBold,
        marginVertical: '5%',
        textAlign: 'center',
    },
});

export default WelcomeText;
