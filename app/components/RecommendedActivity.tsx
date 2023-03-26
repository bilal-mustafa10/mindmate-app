import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Card from './Card';
import {theme} from '../constants/Theme';
import {RootStackParamList} from '../navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IShortcut} from '../constants/Shortcuts';


interface ShortcutsProps {
    activities: IShortcut[];
    navigation: NativeStackNavigationProp<RootStackParamList, 'Root'>;
}

const RecommendedActivity = ({activities, navigation}: ShortcutsProps) => {
    const activitiesToDisplay = activities.slice(0, 4); // Limit the number of displayed shortcuts to 4

    return (
        <View style={styles.container}>
            {activitiesToDisplay.map((activity, index) => (
                <View key={index} style={index % 2 === 0 ? { marginBottom: 10 } : {}}>
                    <TouchableOpacity onPress={() => navigation.navigate(activity.navigateTo)}>
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


export default RecommendedActivity;
