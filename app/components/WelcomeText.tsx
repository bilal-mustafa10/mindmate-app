import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface WelcomeTextProps {
    title: string;
    description: string;
    titleStyle?: object;
    descriptionStyle?: object;
}

const WelcomeText: React.FC<WelcomeTextProps> = ({title, description, titleStyle, descriptionStyle}) => {
    return (
        <View style={styles.container}>
            <Text style={[titleStyle]}>{title}</Text>
            <Text style={[descriptionStyle]}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: '5%',
    },
});

export default WelcomeText;
