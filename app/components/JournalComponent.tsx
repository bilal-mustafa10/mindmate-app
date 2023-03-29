import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Card from './Card';
import {theme} from '../constants/Theme';
import {RootStackParamList} from '../navigation/types';
import {NavigationProp} from '@react-navigation/native';


interface JournalComponentProps {
    navigation: NavigationProp<RootStackParamList>;
}

interface IJournal {
    name: string;
    logo: any;
    navigateTo: keyof RootStackParamList;
}
const journal: IJournal[] = [
    {name: 'Mood Journal', logo: require('../assets/images/journal/mood-journal.png'), navigateTo: 'MoodJournal'},
    {name: 'Self-Reflection Journal', logo: require('../assets/images/journal/self-reflection-journal.png'), navigateTo: 'SelfReflectionJournal'}
];


const JournalComponent = ({navigation}: JournalComponentProps) => {

    return (
        <View style={styles.container}>
            {journal.map((journal, index) => (
                <View key={index} style={index % 2 === 0 ? {marginBottom: 10} : {}}>
                    <TouchableOpacity onPress={() => {(navigation.navigate(journal.navigateTo));}}>
                        <Card
                            type={'large'}
                            key={index}
                            photo={journal.logo}
                            title={journal.name}
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
