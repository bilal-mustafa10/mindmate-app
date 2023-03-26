import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Card from './Card';
import {theme} from '../constants/Theme';

const journal = [
    {name: 'Mood Journal', logo: require('../assets/images/journal/mood-journal.png'), navigateTo: 'Root'},
    {name: 'Self-Reflection Journal', logo: require('../assets/images/journal/self-reflection-journal.png'), navigateTo: 'Root'}
];


const JournalComponent = () => {
    return (
        <View style={styles.container}>
            {journal.map((activity, index) => (
                <View key={index} style={index % 2 === 0 ? {marginBottom: 10} : {}}>
                    <TouchableOpacity onPress={() => {
                        console.log('pressed');
                    }}>
                        <Card
                            type={'large'}
                            key={index}
                            photo={activity.logo}
                            title={activity.name}
                            borderColor={theme.card_theme[index]}
                        />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});


export default JournalComponent;
